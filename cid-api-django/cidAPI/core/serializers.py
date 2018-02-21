from user.models import User

from .models.post import Post
from .models.comment import Comment
from .models.commit import Commit
from .models.models_3d import Model3D

from rest_framework import serializers

### Serializers are used to translate python/django objects into whatever I want - json/xml etc. ###

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'first_name', 
            'last_name',
            'username', 
            'profile_picture',
            'description',
            'date_created',
        )

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = (
            'post'
            'posted_by',
            'date_posted',
            'content',
        )

class Model3DSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model3D
        fields = (
            'id',
            'filename',
            'owners',
            'date_uploaded',
            'favorited_by',
            'polygons',
        )

class CommitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commit
        fields = (
            'belongs_to_model',
            'commited_by',
            'details',
            'date',
            'polygons_changed'
        )

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            'id',
            'posted_by',
            'description',
            'content',
            'is_relevant',
            'is_recent',
            'likes',
        )
