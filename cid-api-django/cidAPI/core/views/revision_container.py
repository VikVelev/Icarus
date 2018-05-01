from django.http import HttpResponse
from django.http import Http404
from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import status, permissions, generics, mixins

from ..models.revision_container import Revision
from ..serializers.revision_serializers import RevisionSerializer, AddRevisionSerializer
from ..permissions import IsOwnerOrReadOnly
from django.contrib.auth.models import User

class Revisions(generics.ListCreateAPIView, mixins.DestroyModelMixin):

    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        if self.kwargs.get("pk") is not None:
            queryset = Revision.objects.filter(posted_by=self.kwargs["pk"])

            if self.kwargs.get("model_id") is not None:
                queryset = Revision.objects.filter(posted_by=self.kwargs["pk"], model=self.kwargs["model_id"])
        
        return queryset

    def get_serializer_class(self):
        if self.request.method == "GET":
            return RevisionSerializer
        else:
            return AddRevisionSerializer

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


    