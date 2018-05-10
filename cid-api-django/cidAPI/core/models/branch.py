from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

from .user import Profile

class Branch(models.Model):
    name = models.CharField(max_length=64, unique=True)
    created = models.DateTimeField(auto_now=True)
    
