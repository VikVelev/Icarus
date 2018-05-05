from django.contrib.auth import get_user_model
from rest_framework.response import Response
User = get_user_model()

from ..models.post import Post
from ..models.comment import Comment

from .user_serializers import UserSerializer
from .model3d_serializers import Model3DSerializer

from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = (
            'post',
            'posted_by',
            'date_posted',
            'content',
        )


class PostSerializer(serializers.ModelSerializer):

    comments = CommentSerializer(many=True, read_only=True)
    date_posted = serializers.DateTimeField(read_only=True)
    
    posted_by = UserSerializer(read_only=True)
    content = Model3DSerializer()

    class Meta:
        model = Post
        fields = (
            'id',
            'posted_by',
            'image',
            'title',
            'description',
            'content',
            'date_posted',
            'is_relevant',
            'is_recent',
            'comments',
            'edited',
            'likes',
        )

class CreatePostSerializer(serializers.ModelSerializer):

    comments = CommentSerializer(many=True, read_only=True)
    date_posted = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Post
        fields = (
            'id',
            'posted_by',
            'image',
            'title',
            'description',
            'content',
            'date_posted',
            'is_relevant',
            'is_recent',
            'comments',
            'likes',
        )
