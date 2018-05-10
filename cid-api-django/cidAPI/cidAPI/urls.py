from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include
from django.conf import settings
from django.contrib.staticfiles.views import serve
from django.views.generic import RedirectView
import os


admin.autodiscover()

urlpatterns = [
    path('admin/', admin.site.urls),
    ### Now I can isolate this app from everything else and work only in it's directory
    path('api/', include('core.urls')),
    ###        

    ### Serving SPA configuration
    #url(r'^$', serve,

    #   kwargs={'path': 'index.html'}),
    url(r'^static/(?P<path>.*)$', serve,{'document_root': os.path.join(os.path.dirname(__file__),  settings.STATIC_ROOT)}), 
    ###
]
