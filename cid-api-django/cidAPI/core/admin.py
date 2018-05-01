from django.contrib import admin
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()

from .models.user import Profile
from .models.post import Post
from .models.comment import Comment
from .models.commit import Commit
from .models.models_3d import Model3D
from .models.revision_container import Revision

# Register your models here.
admin.site.register(Profile)
admin.site.register(Post)
admin.site.register(Model3D)
admin.site.register(Comment)
admin.site.register(Commit)
admin.site.register(Revision)