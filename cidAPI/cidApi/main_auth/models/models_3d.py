from django.db import models
from django.utils import timezone
from .user import User

class Model3D(models.Model):
    filename = models.FileField()

    # Many models many owners, seems reasonable to me
    owners = models.ManyToManyField(User, related_name='owners')

    date_uploaded = models.DateTimeField()
    
    # Many models many people who like them.
    favorited_by = models.ManyToManyField(User, related_name='favorited_by')

    polygons = models.IntegerField()

