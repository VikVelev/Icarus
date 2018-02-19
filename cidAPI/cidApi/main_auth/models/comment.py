from django.db import models
from django.utils import timezone

class Comment(models.Model):
    posted_by = models.ForeignKey("User", on_delete=models.CASCADE)
    post = models.ForeignKey("Post", related_name='comments', on_delete=models.DO_NOTHING, null=True)
    date_posted = models.DateField()

    content = models.TextField()