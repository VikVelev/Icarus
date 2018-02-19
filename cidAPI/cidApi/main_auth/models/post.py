from django.db import models
from django.utils import timezone

class Post(models.Model):
    posted_by = models.ForeignKey("User", related_name='posts', on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)

    content = models.TextField(blank=True, null=True) #FOREIGN KEY TO 3D MODELS

    is_relevant = models.BooleanField()
    is_recent = models.BooleanField()
    likes = models.IntegerField(blank=True, null=True)

