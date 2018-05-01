from django.http import HttpResponse
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics, mixins
from ..permissions import IsOCOrReadOnly

from ..models.commit import Commit
from ..serializers.model3d_serializers import CommitSerializer, CommitEntrySerializer

from django.contrib.auth.models import User

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
        # If No permissions then put into revision
        # TODO: Check the owners array and post to revisions if you are not in there        
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        
        # A stupid try to escape nested serializers
        user_id = self.kwargs["pk"]
        user = User.objects.get(id=user_id)
        serializer.validated_data['committed_by'] = user 
        #
        
        serializer.save()

