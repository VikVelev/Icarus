from django.conf.urls import url
from django.urls import path, re_path
from rest_framework.authtoken.views import obtain_auth_token

from .views.users import Users, ListAllUsers, RegisterUser
from .views.posts import ListAllPosts
from .views.models import Models3D

urlpatterns = [
    # Main URIs
    path('login/', obtain_auth_token),    
    path('register/', RegisterUser.as_view()),    
    path('feed/', ListAllPosts.as_view()),
    
    # Users URIs
    path('users/', ListAllUsers.as_view()),
    re_path(r'^user/(?P<pk>[0-9]+)/$', Users.as_view()),
    re_path(r'^user/(?P<pk>[0-9]+)/3d-models/$', Models3D.as_view())
    # user/id/posts
    # user/id/commits
    # re_path(r'^user/(?P<pk>[0-9]+)/$', )
]
