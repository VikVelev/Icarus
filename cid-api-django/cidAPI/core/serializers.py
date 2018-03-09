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

    id = serializers.IntegerField(read_only=True)
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
            serializer = ProfileSerializer(Profile.objects.get(pk=instance.id), data=instance.profile_data)
            
            # serializer = self.get_serializer(ProfileSerializer, data=instance.profile_data, partial=True)
            
            serializer.is_valid()

            print(instance.profile_data)
            instance.first_name = validated_data.get('first_name', instance.first_name)
            instance.last_name = validated_data.get('last_name', instance.last_name)
            instance.email = validated_data.get('email', instance.email)
            # Profile.objects.filter(pk=instance.id).update(user=instance, **instance.profile_data)

            instance.save()
            serializer.save()

            return instance

### End of User Serializers

#### 3D model serializers

class CommitSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(read_only=True)
    commited_by = serializers.PrimaryKeyRelatedField(read_only=True)
    ### TODO: THINK of a way to store version numbers
    class Meta:
        model = Commit
        fields = (
            'title',
            'belongs_to_model',
            'new_version',
            'commited_by',
            'details',
            'date',
        )

class Model3DSerializer(serializers.ModelSerializer):

    User = get_user_model()

    commits = CommitSerializer(many=True, required=False, read_only=True)
    favorited_by = UserSerializer(many=True, required=False, read_only=True)
    
    date_uploaded = serializers.DateTimeField(read_only=True)
    owners = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Model3D
        fields = (
            'id',
            'title',
            'owners',
            'description',
            'date_uploaded',
            'favorited_by',
            'commits'
        )

#### End of 3D Models Serializers