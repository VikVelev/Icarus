from django.db import models
from django.utils import timezone
from django.conf import settings

class Comment(models.Model):
    # if a user is deleted delete his comments.
    post = models.ForeignKey("Post", related_name='comments', on_delete=models.CASCADE, null=True)
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # If a post is deleted delete all Comments
    date_posted = models.DateField()

    content = models.TextField()