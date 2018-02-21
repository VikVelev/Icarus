from django.contrib import admin
from django.conf import settings


from user.models import User

from .models.post import Post
from .models.comment import Comment
from .models.commit import Commit
from .models.models_3d import Model3D

# Register your models here.
admin.site.register(User)
admin.site.register(Post)
admin.site.register(Model3D)
admin.site.register(Comment)
admin.site.register(Commit)