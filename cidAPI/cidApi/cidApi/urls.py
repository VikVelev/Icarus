from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    ### Now I can isolate this app from everything else and work only in it's directory
    path('', include('main_auth.urls'))
    ###
]
