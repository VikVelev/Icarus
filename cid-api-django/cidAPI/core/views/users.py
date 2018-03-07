from django.http import HttpResponse
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics, mixins

from ..permissions import IsAdminOrReadOnly

from django.contrib.auth import get_user_model

User = get_user_model()

from ..serializers import UserSerializer

from rest_framework.permissions import IsAuthenticated

## Not sure if pseudo-code or python :thinking:

### Props to django <3
    
class Users(generics.RetrieveUpdateDestroyAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer  
    permission_classes = (IsAuthenticated, )

class ListAllUsers(generics.ListAPIView):

    permission_classes = (IsAuthenticated, )
    queryset = User.objects.all()
    serializer_class = UserSerializer

