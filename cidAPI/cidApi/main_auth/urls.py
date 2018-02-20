from django.conf.urls import url
from .views.list_users import ListUsers

urlpatterns = [
    url(r'^users/$', ListUsers.as_view()),
]