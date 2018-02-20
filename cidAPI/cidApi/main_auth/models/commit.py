from django.db import models
from django.utils import timezone

class Commit(models.Model):
    # if a model is deleted delete it's commits too?
    belongs_to_model = models.ForeignKey("Model3D", related_name='commits', on_delete=models.CASCADE, null=True)
    #If a user is deleted, delete all commits.
    commited_by = models.ForeignKey("User", on_delete=models.CASCADE, null=True)
    details = models.TextField(null=True)

    date = models.DateTimeField()
    polygons_changed = models.IntegerField()