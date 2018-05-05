from django.contrib.auth import get_user_model
from rest_framework.response import Response
User = get_user_model()

from ..models.user import Profile

from rest_framework import serializers


class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = (
            'country', 
            'birth_date',
            'profile_picture',
            'description',
            'software',
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
            
            serializer.is_valid()

            instance.first_name = validated_data.get('first_name', instance.first_name)
            instance.last_name = validated_data.get('last_name', instance.last_name)
            instance.email = validated_data.get('email', instance.email)

            instance.save()
            serializer.save()

            return instance
