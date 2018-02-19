from django.db import models
from django.utils import timezone

class User(models.Model):

    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)

    username = models.CharField(max_length=64)

    def __str__(self):
        return self.username

    profile_picture = models.ImageField(null=True, blank=True)
    description = models.TextField()

    # Gotta fix relations
    #following = models.ForeignKey("User", related_name="User", null=True, blank=True, on_delete=models.SET_NULL)
    #followed_by = models.ForeignKey("User", null=True, blank=True, on_delete=models.SET_NULL)

    #favorites = models.ForeignKey("Model3D", related_name="favorites", on_delete=models.CASCADE, null=True, blank=True) # FOREIGN KEY TO MODELS

    date_created = models.DateTimeField()
    #models_3d = models.ForeignKey("Model3D", related_name="models_3d", on_delete=models.CASCADE, null=True, blank=True)
    
    
