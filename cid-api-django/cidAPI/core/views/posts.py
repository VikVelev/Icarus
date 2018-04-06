from django.http import HttpResponse
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics


from ..models.post import Post
from ..serializers.post_serializers import PostSerializer, CreatePostSerializer

from pprint import pprint

class ListCreatePosts(generics.ListAPIView, generics.CreateAPIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            print("WHAT")
            return CreatePostSerializer
        else:
            return PostSerializer

    def get_queryset(self):
        queryset = Post.objects.all()
        posted_by = self.request.query_params.get('posted_by', None)
        posted_model = self.request.query_params.get('posted_model', None)       

        if posted_by is not None:
            queryset = queryset.filter(posted_by=posted_by)

        if posted_model is not None:
            queryset = queryset.filter(content=posted_model)
    
        return queryset
    
    


# Gotta implement permissions so no one can edit everyone's posts

class Posts(generics.RetrieveUpdateDestroyAPIView):
    
    permission_classes = (permissions.IsAuthenticated,)    
    serializer_class = PostSerializer

    def get_queryset(self):
        post_pk = self.kwargs["pk"]

        return Post.objects.filter(id=post_pk)

