from django.http import HttpResponse
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics

from ..models.post import Post
from ..serializers import PostSerializer


class ListCreatePosts(generics.ListAPIView, generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# Gotta do something to differentiate a user's posts and such



class Posts(generics.RetrieveUpdateDestroyAPIView):
    def get_queryset(self):
        user_pk = self.kwargs["pk"]
        return Post.objects.filter(posted_by=user_pk)

    serializer_class = PostSerializer
