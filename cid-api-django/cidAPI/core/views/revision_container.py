from django.http import HttpResponse
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics, mixins

from ..models.commit import Commit
from ..serializers.model3d_serializers import CommitSerializer, CommitEntrySerializer
from ..serializers.revision_serializers import RevisionSerializer

from django.contrib.auth.models import User

class Revisions(mixins.ListModelMixin,
                mixins.CreateModelMixin, 
                generics.GenericAPIView):

    permission_classes = (permissions.IsAuthenticated, )   

    def get(self, request, *args, **kwargs):
        # Get the requested model's revisions
        # self.kwargs["model_id"]
        return Response(status=404)

