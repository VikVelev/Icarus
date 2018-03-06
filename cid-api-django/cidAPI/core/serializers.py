from django.contrib.auth import get_user_model
from rest_framework.response import Response
User = get_user_model()

from .models.user import Profile
from .models.post import Post
from .models.comment import Comment
from .models.commit import Commit
from .models.models_3d import Model3D

from rest_framework import serializers

### Serializers are used to translate python/django objects into whatever I want - json/xml etc. ###

###### TODO Look into better structuring for serializers

#### Post Serializers

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

#### End of Post Serializers

#### User Serializers

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
            'password',
        )
    
    def create(self, validated_data):

        password = validated_data.get("password")

        # TODO FIX THIS SO PASSWORD VALIDATION WORKS // USE django-rest-registration
        created_user = User.objects.create(**validated_data)
        created_user.set_password(password)
        created_user.save()

        return created_user

### End of User Serializers

#### 3D model serializers

class CommitSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(read_only=True)
    commited_by = serializers.PrimaryKeyRelatedField(read_only=True)
    ### TODO: THINK of a way to store version numbers
    class Meta:
        model = Commit
        fields = (
            'belongs_to_model',
            'old_version',
            'new_version',
            'commited_by',
            'details',
            'date',
        )

from django.contrib.auth import get_user_model

class Model3DSerializer(serializers.ModelSerializer):

    User = get_user_model()

    commits = CommitSerializer(many=True, required=False,read_only=True)
    favorited_by = UserSerializer(many=True, required=False, read_only=True)
    
    date_uploaded = serializers.DateTimeField(read_only=True)
    owners = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Model3D
        fields = (
            'id',
            'filename',
            'owners',
            'date_uploaded',
            'favorited_by',
            'polygons',
            'commits'
        )

#### End of 3D Models Serializers