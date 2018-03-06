from django.conf.urls import url
from django.urls import path, re_path, include
from rest_framework.authtoken.views import obtain_auth_token

from .views.users import Users, ListAllUsers, RegisterUser
from .views.posts import ListCreatePosts, Posts
from .views.models_3d import Models3D, ListAllModels3D
from .views.contributions import Contributions

from .views.customObtainAuthToken import CustomObtainAuthToken

urlpatterns = [
    # Main URIs
    path('login/', obtain_auth_token),
    path('accounts/login/', CustomObtainAuthToken.as_view()),
    path('accounts/', include('rest_registration.api.urls')),
    path('register/', RegisterUser.as_view()),    
    path('posts/', ListCreatePosts.as_view()),
    path('3d-models/', ListAllModels3D.as_view()),
    
    # Users URIs
    path('users/', ListAllUsers.as_view()),
    re_path(r'^user/(?P<pk>[0-9]+)/$', Users.as_view()),
    re_path(r'^user/(?P<pk>[0-9]+)/posts/$', Posts.as_view()),
    re_path(r'^user/(?P<pk>[0-9]+)/3d-models/$', Models3D.as_view()),
    re_path(r'^user/(?P<pk>[0-9]+)/contributions/$', Contributions.as_view()),
    
]
