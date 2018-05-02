from django.contrib.auth import get_user_model
from rest_framework.response import Response
User = get_user_model()

from ..models.commit import Commit
from ..models.models_3d import Model3D
from ..models.revision_container import Revision
from .user_serializers import UserSerializer
from rest_framework import serializers


# This serializer gets pks and makes the record.
class AddRevisionSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only=True)
    date_added = serializers.DateTimeField(read_only=True)
    date_resolved = serializers.DateTimeField(read_only=True)
    resolved = serializers.BooleanField(read_only=True)

    class Meta:
        model = Revision
        fields = (
            'id',
            'title',
            'model',
            'commit_mesh',
            'commit_textures', 
            'commit_details',            
            'posted_by',
            'resolved',
            'date_added',
            'date_resolved',
        )

# This serializer based on the pks set by the other one, converts the relations into nested 
# JSON responses, resulting in efficient queries. (Query once, get all the info (performance isn't a concern with mere kb sizes))
class RevisionSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only=True)
    date_added = serializers.DateTimeField(read_only=True)
    model = Model3D()
    class Meta:
        model = Revision
        fields = (
            'id',
            'title',
            'model',
            'commit_mesh',
            'commit_textures',
            'commit_details',                        
            'posted_by',
            'resolved',
            'date_added',
            'date_resolved',
        )