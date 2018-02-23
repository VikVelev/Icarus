from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include
from django.contrib.staticfiles.views import serve
from django.views.generic import RedirectView

admin.autodiscover()

urlpatterns = [
    path('admin/', admin.site.urls),
    ### Now I can isolate this app from everything else and work only in it's directory
    path('api/', include('core.urls')),
    ###        

    ### Serving SPA configuration
    url(r'^$', serve,
        kwargs={'path': 'index.html'}),

    # SHOULD WRITE SCRIPT that moves everything from REACT to the static folder
    url(r'^(?!/?static/)(?!/?media/)(?P<path>.*\..*)$', RedirectView.as_view(url='/static/%(path)s', permanent=True)),
    ###
]
