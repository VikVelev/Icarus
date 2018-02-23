from django.http import HttpResponse
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics

from ..models.post import Post
from ..serializers import PostSerializer

class ListAllPosts(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer