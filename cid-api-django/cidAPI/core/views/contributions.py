from django.http import HttpResponse
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics, mixins, serializers
from ..permissions import IsOCOrReadOnly

from ..models.commit import Commit
from ..models.revision_container import Revision
from ..models.models_3d import Model3D
from ..serializers.model3d_serializers import CommitSerializer, CommitEntrySerializer, Model3DSerializer

from django.contrib.auth.models import User

from pprint import pprint
class Contributions(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    generics.GenericAPIView):

    permission_classes = (permissions.IsAuthenticated, IsOCOrReadOnly)
    
    supported_mesh_formats = (".obj",)
    supported_texture_formats = (".mtl",)
        
    def get_serializer_class(self):
        if self.request.method == "GET":
            return CommitEntrySerializer
        else:
            return CommitSerializer

    def get_queryset(self):
        user_pk = self.kwargs["pk"]
        return Commit.objects.filter(committed_by_id__in=[user_pk])

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if not serializer.validated_data["new_version"].name[-4:] in self.supported_mesh_formats:
            return Response({
                    "error": "Not a valid mesh file"
                }, status=status.HTTP_400_BAD_REQUEST)

        if serializer.validated_data["new_textures"] is not None:
            if not serializer.validated_data["new_textures"].name[-4:] in self.supported_texture_formats:
                return Response({
                        "error": "Not a valid textures file"
                    }, status=status.HTTP_400_BAD_REQUEST)
            
        user_id = self.request.user.id
        user = User.objects.get(id=user_id)
        
        is_owner = False      

        committing_to = serializer.validated_data["belongs_to_model"]
        model_owners = Model3D.objects.filter(id=committing_to.id).values("owners")

        for owner in model_owners:
            #If the user is one of the owners just save the serializer and return
            if owner["owners"] == user_id:
                is_owner = True
                break
        
        self.perform_create(serializer, is_owner)
        headers = self.get_success_headers(serializer.data)

        if is_owner:
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            new_revision = Revision.objects.create(
                title=serializer.validated_data['title'],
                model=committing_to,
                commit_mesh=serializer.validated_data["new_version"],
                commit_textures=serializer.validated_data["new_textures"],
                commit_details=serializer.validated_data["details"],                                                                                                                                                 
                posted_by=user
            )

            # TODO: Serialize user, revision, commit data and send as a response.
            data = {
                "revision_id": new_revision.id,
                "owned_by_id": model_owners[0]["owners"],
                "posted_by_id": user.id,
            }
            
            return Response(data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer, is_owner):

        if is_owner:
            user_id = self.request.user.id
            user = User.objects.get(id=user_id)
            serializer.validated_data['committed_by'] = user 
            
            serializer.save()    

