from django.contrib.auth import get_user_model
User = get_user_model()

from .models.user import Profile
from .models.post import Post
from .models.comment import Comment
from .models.commit import Commit
from .models.models_3d import Model3D

from rest_framework import serializers

### Serializers are used to translate python/django objects into whatever I want - json/xml etc. ###

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = (
            'post'
            'posted_by',
            'date_posted',
            'content',
        )


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)

    class Meta:
        model = Post
        fields = (
            'id',
            'posted_by',
            'description',
            'content',
            'is_relevant',
            'is_recent',
            'comments',
            'likes',
        )
    
    def create(self, validated_data):

        comments_data = validated_data.pop('comments')
        post = Post.objects.create(**validated_data)

        for comment_data in comments_data:
            Comment.objects.create(post=post, **comment_data)
        
        return album


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

################### User Serializers for all kinds of things ############

class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = (
            'country', 
            'birth_date',
            'profile_picture',
            'description',
        )


class UserSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(required=False)
    # add models somehow or maybe a get models method
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'profile',
        )

    def update(self, instance, validated_data):

        instance.profile_data = validated_data.pop('profile')

        instance.user = User.objects.update(**validated_data)
        Profile.objects.update(user=instance.user, **instance.profile_data)

        return instance


class RegisterUser(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'password'
        )
    
    def create(self, validated_data):

        password = validated_data.pop("password")

        created_user = User.objects.create(**validated_data)
        created_user.set_password(password)
        created_user.save()

        return created_user

