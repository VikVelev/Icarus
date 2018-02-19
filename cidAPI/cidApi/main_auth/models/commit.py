from django.db import models
from django.utils import timezone

class Commit(models.Model):
    belongs_to_model = models.ForeignKey("Model3D", related_name='commits', on_delete=models.CASCADE, null=True)
    ####!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! CASCADE ??????????????????
    commited_by = models.ForeignKey("User", on_delete=models.CASCADE, null=True)
    details = models.TextField(null=True)

    date = models.DateTimeField()
    polygons_changed = models.IntegerField()