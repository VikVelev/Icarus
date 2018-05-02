from django.db import models
from django.utils import timezone
from django.conf import settings


class Commit(models.Model):

    title = models.CharField(max_length=64)
    belongs_to_model = models.ForeignKey("Model3D", related_name='commits', on_delete=models.CASCADE)
    new_version = models.FileField(null=False, blank=False)
    new_textures = models.FileField(null=True, blank=True)
    
    #If a user is deleted, delete all commits.
    committed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    details = models.TextField(null=False)
    
    version_number = models.IntegerField(default=1)
    date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # This only happens if the objects is
        # not in the database yet. Otherwise it would
        # have pk
        if not self.pk:
            if Commit.objects.filter(belongs_to_model=self.belongs_to_model): # pylint: disable=E1101
                currentCommit = Commit.objects.filter(belongs_to_model=self.belongs_to_model).order_by('id').reverse()[0] # pylint: disable=E1101
                self.version_number = currentCommit.version_number + 1
        
        super(Commit, self).save(*args, **kwargs)