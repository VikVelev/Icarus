from django.conf.urls import url
from .views.users import Users, ListAllUsers, RegisterUser

urlpatterns = [
    url(r'^register/$', RegisterUser.as_view()),    
    url(r'^users/$', ListAllUsers.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', Users.as_view()),
]