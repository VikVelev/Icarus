from django.contrib.auth import get_user_model
from rest_framework.response import Response
User = get_user_model()

from ..models.commit import Commit
from ..models.models_3d import Model3D

from .user_serializers import UserSerializer

from rest_framework import serializers


class CommitSerializer(serializers.ModelSerializer):

    date = serializers.DateTimeField(read_only=True)
    commited_by = UserSerializer(read_only=True)
    id = serializers.IntegerField(read_only=True)
    version_number = serializers.IntegerField(read_only=True) 

    class Meta:
        model = Commit
        fields = (
            'id',
            'title',
            'belongs_to_model',
            'new_version',
            'new_textures',
            'commited_by',
            'version_number',
            'details',
            'date',
        )


class Model3DSerializer(serializers.ModelSerializer):

    User = get_user_model()

    commits = CommitSerializer(many=True, required=False, read_only=True)
    favorited_by = UserSerializer(many=True, required=False, read_only=True)
    
    date_uploaded = serializers.DateTimeField(read_only=True)
    owners = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Model3D
        fields = (
            'id',
            'title',
            'owners',
            'description',
            'date_uploaded',
            'favorited_by',
            'commits',
        )

class CommitEntrySerializer(serializers.ModelSerializer):

    date = serializers.DateTimeField(read_only=True)
    commited_by = UserSerializer(read_only=True)
    id = serializers.IntegerField(read_only=True)
    version_number = serializers.IntegerField(read_only=True) 

    belongs_to_model = Model3DSerializer()

    class Meta:
        model = Commit
        fields = (
            'id',
            'title',
            'belongs_to_model',
            'new_version',
            'new_textures',
            'commited_by',
            'version_number',
            'details',
            'date',
        )