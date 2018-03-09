from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

from .user import Profile

class Model3D(models.Model):
    title = models.CharField(max_length=64)
    # Many models many owners, seems reasonable to me
    owners = models.ManyToManyField(User, related_name='owners')
    description = models.TextField(null=True)
    date_uploaded = models.DateTimeField(auto_now_add=True)
    
    # Many models many people who like them.
    favorited_by = models.ManyToManyField(User, related_name='favorited_by')

