from django.http import HttpResponse
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics, mixins

from ..permissions import IsAdminOrReadOnly

from django.contrib.auth import get_user_model

User = get_user_model()

from ..serializers.user_serializers import UserSerializer

from rest_framework.permissions import IsAuthenticated


class Users(generics.RetrieveUpdateDestroyAPIView):


    queryset = User.objects.all()
    serializer_class = UserSerializer  
    permission_classes = (IsAuthenticated, )

class ListAllUsers(generics.ListAPIView):

    permission_classes = (IsAuthenticated, )
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        user_id = self.request.query_params.get('id', None)

        if user_id is not None:
            queryset = queryset.filter(pk=user_id)

        return queryset

