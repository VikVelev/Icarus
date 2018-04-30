from django.contrib.auth import get_user_model
from rest_framework.response import Response
User = get_user_model()

from ..models.commit import Commit
from ..models.models_3d import Model3D
from .model3d_serializers import Model3DSerializer
from .user_serializers import UserSerializer
from rest_framework import serializers

class RevisionSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only=True)
    date_added = serializers.DateTimeField(read_only=True)
    # this should be returned, but only id should be taken as an input
    posted_by = UserSerializer(read_only=True)

    model = Model3DSerializer()

    class Meta:
        model = Commit
        fields = (
            'id',
            'title',
            'model',
            'commit',
            'posted_by',
            'resolved',
            'date_added',
            'date_resolved',
        )