from django.http import HttpResponse
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics, mixins

from ..models.models_3d import Model3D
from ..serializers import Model3DSerializer
import pprint


class ListAllModels3D(generics.ListAPIView):
    queryset = Model3D.objects.all()
    serializer_class = Model3DSerializer

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
        print(request.data, kwargs)
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        # FIXME: this is a bad way to set the value, but ...
        user_id = self.kwargs["pk"]
        serializer.validated_data['owners'] = [user_id]

        serializer.save()

