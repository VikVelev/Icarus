from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

from .user import Profile

class Model3D(models.Model):
    title = models.CharField(max_length=64, unique=True)
    # Many models many owners, seems reasonable to me
    owners = models.ManyToManyField(User, related_name='owners')
    description = models.TextField(null=True)
    date_uploaded = models.DateTimeField(auto_now_add=True)
    #branch = models.OneToOneField("Branch", related_name="model", on_delete=models.CASCADE,)
    # Many models many people who like them.
    favorited_by = models.ManyToManyField(User, related_name='favorited_by')
    viewcount = models.BigIntegerField(default=0)
