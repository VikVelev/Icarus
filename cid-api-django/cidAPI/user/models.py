from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    first_name = models.CharField(null=True, blank=True, max_length=64)
    last_name = models.CharField(null=True, blank=True, max_length=64)

    profile_picture = models.ImageField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.first_name

    ### Still looking into those:
    
    #following = models.ForeignKey("User", related_name="User", null=True, blank=True, on_delete=models.SET_NULL)
    #followed_by = models.ForeignKey("User", null=True, blank=True, on_delete=models.SET_NULL)

    #favorites = models.ForeignKey("Model3D", related_name="favorites", on_delete=models.CASCADE, null=True, blank=True)
    #models_3d = models.ForeignKey("Model3D", related_name="models_3d", on_delete=models.CASCADE, null=True, blank=True)
    
    ###

