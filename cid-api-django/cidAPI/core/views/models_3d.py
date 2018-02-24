from django.http import HttpResponse
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics

from ..models.models_3d import Model3D
from ..serializers import Model3DSerializer

class Models3D(generics.ListAPIView):
    # TODO This should not be all, but only for the user whoose id I've asked
    queryset = Model3D.objects.all()
    serializer_class = Model3DSerializer