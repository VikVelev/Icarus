from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

from .user import Profile
from .models_3d import Model3D
from .commit import Commit

class Revision(models.Model):

    title = models.CharField(max_length=64)
    
    model = models.ForeignKey("Model3D", related_name='revisions', on_delete=models.CASCADE)

    commit_mesh = models.FileField(null=False, blank=False)
    commit_textures = models.FileField(null=True, blank=True)
    
    #If a user is deleted, delete all commits.
    commit_details = models.TextField(null=False)
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE)
    
    resolved = models.BooleanField(default=False, blank=False)
    date_added = models.DateTimeField(auto_now_add=True)
    date_resolved = models.DateTimeField(blank=True, null=True)

