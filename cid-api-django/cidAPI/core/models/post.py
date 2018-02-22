from django.db import models
from django.utils import timezone
from django.conf import settings

class Post(models.Model):
    # if a User is deleted all his Posts will be deleted
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='posts', on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)

    # if Model3D is deleted all posts corresponding to it will be deleted
    content = models.ForeignKey("Model3D", on_delete=models.CASCADE, null=True)

    is_relevant = models.BooleanField()
    is_recent = models.BooleanField()
    likes = models.IntegerField(blank=True, null=True)

