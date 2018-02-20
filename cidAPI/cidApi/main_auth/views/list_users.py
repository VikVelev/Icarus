from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response

from ..models.user import User

from ..serializers import *

class ListUsers(APIView):
    
    def get(self, request, format=None):
        products = User.objects.all()
        serializer = UserSerializer(products, many=True)
        return Response(serializer.data)