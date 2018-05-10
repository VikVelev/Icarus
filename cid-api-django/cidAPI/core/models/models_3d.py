from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

from .user import Profile

class Model3D(models.Model):
    title = models.CharField(max_length=64, unique=True)
    owners = models.ManyToManyField(User, related_name='owners')
    description = models.TextField(null=True)
    date_uploaded = models.DateTimeField(auto_now_add=True)
    favorited_by = models.ManyToManyField(User, related_name='favorited_by')
    forkcount = models.BigIntegerField(default=0)
    is_fork = models.BooleanField(default=False)
    fork_of = models.ForeignKey( "Model3D", on_delete=models.DO_NOTHING, blank=True, null=True )
    nth_commit = models.BigIntegerField(default=0)
    viewcount = models.BigIntegerField(default=0)


    def _increment_forkcount(self):
        self.viewcount =+ 1

        return self.viewcount