from django.http import HttpResponse
from django.http import Http404
from django.shortcuts import get_object_or_404
from datetime import datetime

from rest_framework.response import Response
from rest_framework import status, permissions, generics, mixins

from ..models.revision_container import Revision
from ..models.commit import Commit
from ..models.models_3d import Model3D
from ..serializers.revision_serializers import RevisionSerializer, AddRevisionSerializer
from ..permissions import IsOPOrReadOnly
from django.contrib.auth.models import User

class Revisions(generics.ListCreateAPIView, mixins.DestroyModelMixin, mixins.UpdateModelMixin):

    # TODO: Fix permissions, right now everyone with a little reverse engineering can approve and/or reject revisions
    permission_classes = (permissions.IsAuthenticated, IsOPOrReadOnly)

    def get_queryset(self):
        if self.kwargs.get("pk") is not None:
            queryset = Revision.objects.filter(model__owners__in=[self.kwargs["pk"]])

            if self.kwargs.get("model_id") is not None:
                queryset = Revision.objects.filter( model__owners__in=[self.kwargs["pk"]], 
                                                    model=self.kwargs["model_id"] )

            elif self.request.query_params.get('rev_id', None) is not None:
                queryset = Revision.objects.filter( model__owners=self.kwargs["pk"], 
                                                    id=self.request.query_params.get('rev_id', None) )

        return queryset

    def get_serializer_class(self):
        if self.request.method == "GET" or self.request.method == "PATCH":
            return RevisionSerializer
        else:
            return AddRevisionSerializer

    def get_object(self):
        queryset = self.get_queryset()
    
        pk = self.request.query_params.get('rev_id', None)
        obj = get_object_or_404(queryset, pk=pk)
        self.check_object_permissions(self.request, obj)

        return obj

    # Used to mark as resolved
    def patch(self, request, *args, **kwargs):
        self.check_object_permissions(request, self.get_object())
        return self.update(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        #if deny is neither 0 nor 1 this won't work
        deny = self.request.query_params.get('deny')
        self.perform_update(serializer, int(deny))

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer, deny):
        revision_data = Revision.objects.filter(id=serializer.validated_data["id"]).first()

        if deny == 1 or deny == 0 and not revision_data.status == "APPROVED":
            serializer.validated_data["resolved"] = not bool(deny)
            serializer.validated_data["date_modified"] = datetime.now()

            if deny == 1: 
                serializer.validated_data["status"] = "REJECTED"
            else:
                serializer.validated_data["status"] = "APPROVED"
                Commit.objects.create(
                    title = revision_data.title,
                    belongs_to_model = revision_data.model,
                    new_version = revision_data.commit_mesh,
                    new_textures = revision_data.commit_textures,
                    details = revision_data.commit_details,                 
                    committed_by = revision_data.posted_by,
                )
            
            serializer.save()
        
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
