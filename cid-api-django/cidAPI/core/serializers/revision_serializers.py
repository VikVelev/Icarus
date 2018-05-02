from django.contrib.auth import get_user_model
from rest_framework.response import Response
User = get_user_model()

from ..models.commit import Commit
from ..models.models_3d import Model3D
from ..models.revision_container import Revision

from ..serializers.model3d_serializers import Model3DSerializer
from .user_serializers import UserSerializer
from rest_framework import serializers


# This serializer gets pks and makes the record.
class AddRevisionSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only=True)
    date_added = serializers.DateTimeField(read_only=True)
    date_modified = serializers.DateTimeField(read_only=True)
    resolved = serializers.BooleanField(read_only=True)
    status = serializers.CharField(read_only=True)
    class Meta:
        model = Revision
        fields = (
            'id',
            'status',
            'title',
            'model',
            'commit_mesh',
            'commit_textures', 
            'commit_details',            
            'posted_by',
            'resolved',
            'date_added',
            'date_modified',
        )

# This serializer based on the pks set by the other one, converts the relations into nested 
# JSON responses, resulting in efficient queries. (Query once, get all the info (performance isn't a concern with mere kb sizes))
class RevisionSerializer(serializers.ModelSerializer):
    
    id = serializers.IntegerField(read_only=False)
    commit_mesh = serializers.FileField(read_only=True)
    posted_by = UserSerializer(read_only=True)
    title = serializers.CharField(read_only=True)
    status = serializers.CharField(read_only=True)    
    commit_textures = serializers.FileField(read_only=True)
    commit_details = serializers.CharField(read_only=True)
    date_added = serializers.DateTimeField(read_only=True)
    resolved = serializers.BooleanField(read_only=True)
    date_modified = serializers.DateTimeField(read_only=True)
    model = Model3DSerializer(read_only=True)

    class Meta:
        model = Revision
        fields = (
            'id',
            'status',
            'title',
            'model',
            'commit_mesh',
            'commit_textures',
            'commit_details',                        
            'posted_by',
            'resolved',
            'date_added',
            'date_modified',
        )