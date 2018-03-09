from django.http import HttpResponse
from django.http import Http404
from django.http import FileResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics, mixins

from ..models.models_3d import Model3D
from ..models.commit import Commit
from ..serializers import Model3DSerializer
import pprint
import mimetypes

class ListAllModels3D(generics.ListAPIView):

    serializer_class = Model3DSerializer

    def get_queryset(self):
        queryset = Model3D.objects.all()
        model_id = self.request.query_params.get('id', None)

        if model_id is not None:
            queryset = queryset.filter(pk=model_id)

        return queryset

class Models3D(mixins.ListModelMixin,
                mixins.CreateModelMixin,
                generics.GenericAPIView):
    serializer_class = Model3DSerializer
    def get_queryset(self):
        user_pk = self.kwargs["pk"]
        return Model3D.objects.filter(owners__in=[user_pk])

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        # FIXME: this is a bad way to set the value, but ...
        user_id = self.kwargs["pk"]
        serializer.validated_data['owners'] = [user_id]

        serializer.save()

class CommitFile(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        model_id = self.kwargs["pk"]
        file = Commit.objects.get(id=model_id).old_version
        file_mime = mimetypes.guess_type(str(file))
        return FileResponse(file, content_type=file_mime[0])