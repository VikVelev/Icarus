from django.http import HttpResponse
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics
from rest_framework.permissions import IsAuthenticated

from ..permissions import IsOPOrReadOnly

from ..models.post import Post
from ..serializers.post_serializers import PostSerializer, CreatePostSerializer

from pprint import pprint

class ListCreatePosts(generics.ListAPIView, generics.CreateAPIView):

    permission_classes = (permissions.IsAuthenticated, IsOPOrReadOnly)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreatePostSerializer
        else:
            return PostSerializer

    def get_queryset(self):
        queryset = Post.objects.all().order_by('date_posted')
        
        posted_by = self.request.query_params.get('posted_by', None)
        posted_model = self.request.query_params.get('posted_model', None)       
        
        from_post = self.request.query_params.get('from', None)
        to_post = self.request.query_params.get('to', None)

        if from_post is not None:
            queryset = queryset[int(from_post):]

        if to_post is not None:
            queryset = queryset[:int(to_post)]

        if posted_by is not None:
            queryset = queryset.filter(posted_by=posted_by)

        if posted_model is not None:
            queryset = queryset.filter(content=posted_model)
    
        return queryset
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class TrendingPosts(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = PostSerializer
    queryset = Post.objects.all().order_by("content__viewcount").reverse()

class Posts(generics.RetrieveUpdateDestroyAPIView):
    
    permission_classes = (permissions.IsAuthenticated, IsOPOrReadOnly)    
    serializer_class = PostSerializer

    def perform_update(self, serializer):
        serializer.validated_data["edited"] = True
        serializer.save()

    def get_queryset(self):
        post_pk = self.kwargs["pk"]

        return Post.objects.filter(id=post_pk)

