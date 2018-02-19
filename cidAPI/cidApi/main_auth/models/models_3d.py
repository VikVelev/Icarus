from django.db import models
from django.utils import timezone
from .user import User

class Model3D(models.Model):
    filename = models.CharField(max_length=128)
    owners = models.ManyToManyField(User, related_name='owners')

    date_uploaded = models.DateTimeField()
    favorited_by = models.ManyToManyField(User, related_name='favorited_by')

    polygons = models.IntegerField()

