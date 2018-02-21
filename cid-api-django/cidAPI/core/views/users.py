from django.http import HttpResponse
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics

from ..permissions import IsAdminOrReadOnly

from user.models import User

from ..serializers import *

## Not sure if pseudo-code or python :thinking:

### Props to django <3

class Users(generics.RetrieveUpdateDestroyAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAdminOrReadOnly, )


class ListAllUsers(generics.ListAPIView):

    permission_classes = (IsAdminOrReadOnly, )
    queryset = User.objects.all()
    serializer_class = UserSerializer

