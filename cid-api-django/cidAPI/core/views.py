from django.http import HttpResponse
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from django.contrib.auth import get_user_model
User = get_user_model()

from .models.post import Post
from .models.comment import Comment
from .models.commit import Commit
from .models.models_3d import Model3D

from .serializers import *

class JSONResponse(HttpResponse):
   # An HttpResponse that renders its content into JSON.
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

