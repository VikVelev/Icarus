from django.http import HttpResponse
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics
from rest_framework.permissions import IsAuthenticated


from ..models.post import Post
from ..serializers.post_serializers import PostSerializer, CreatePostSerializer

from pprint import pprint

class ListCreatePosts(generics.ListAPIView, generics.CreateAPIView):

<<<<<<< HEAD

    #permission_classes = (permissions.IsAuthenticated,)
=======
    permission_classes = (permissions.IsAuthenticated,)
>>>>>>> 6e68179dff0faeab79c407c8264a0ad1e58e2c4c

    def get_serializer_class(self):
        if self.request.method == 'POST':
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



class Posts(generics.RetrieveUpdateDestroyAPIView):
    
    permission_classes = (permissions.IsAuthenticated,)    
    serializer_class = PostSerializer

    def get_queryset(self):
        post_pk = self.kwargs["pk"]

        return Post.objects.filter(id=post_pk)

