from django.conf.urls import url
from rest_framework.authtoken.views import obtain_auth_token

from .views.users import Users, ListAllUsers, RegisterUser
from .views.posts import ListAllPosts

urlpatterns = [
    url(r'^login/$', obtain_auth_token),    
    url(r'^register/$', RegisterUser.as_view()),    
    url(r'^users/$', ListAllUsers.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', Users.as_view()),
    url(r'^relevant/$', ListAllPosts.as_view())
    #should plan endpoints
]