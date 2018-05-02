from django.http import HttpResponse
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics, mixins
from ..permissions import IsOCOrReadOnly

from ..models.commit import Commit
from ..models.revision_container import Revision
from ..models.models_3d import Model3D
from ..serializers.model3d_serializers import CommitSerializer, CommitEntrySerializer

from django.contrib.auth.models import User

from pprint import pprint
class Contributions(mixins.ListModelMixin,
                mixins.CreateModelMixin,
                generics.GenericAPIView):

    permission_classes = (permissions.IsAuthenticated, IsOCOrReadOnly)

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

    def perform_create(self, serializer):
        # A stupid try to escape nested input serializers
        user_id = self.request.user.id
        user = User.objects.get(id=user_id)
        serializer.validated_data['committed_by'] = user 
        #    
        serializer.save()
        # Commit creation done'

        # Check if you are the owner of the model
        committing_to = serializer.validated_data["belongs_to_model"]
        model_owners = Model3D.objects.filter(id=committing_to.id).values("owners")
        # If the committer is one of the owners, just add it to the model (do nothing else)
        for owner in model_owners:
            if owner["owners"] == user_id:
                return
        
        # If not -> add to revision 
        # TODO: Don't add it do the model, that would be interesting
        # When creating the new commit think of a way to prevent the first creation
        # Then think of a way to create a new commit without a foreign key to the model

        print(serializer.validated_data)
        print(Commit.objects.filter(**serializer.validated_data))

        new_revision = Revision.objects.create( title=committing_to.title, 
                                                model=committing_to,
                                                commit=Commit.objects.create(**serializer.validated_data), 
                                                posted_by=user )
        
        new_revision.save()
    

