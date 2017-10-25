"""drakonia_exposed URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from .views import index

admin.autodiscover() #not sure what this is

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    #url(r'^$', views.index, name='index')
    url(r'^$', index),
    url(r'^us/$',index),
    url(r'^them/$',index),
    url(r'^radio/$',index)
]
"""
urlpatterns = [
    url(r'^admin/', admin.site.urls),
	url(r'^$',home),
	url(r'^bounties/$',home),
	url(r'^messages/$',home),
	url(r'^events/$',home),
	url(r'^myhits/$',home),
	url(r'^watchlist/$',home),
	url(r'^roguesgallery/$',home),
	url(r'^NAME2/$',views.NAME2),
	url(r'^'+profiles_re+'/$', views.NAME2),
	url(r'^emoji/',include('emoji.urls'))
	] #+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
"""

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from django.conf import settings
from django.conf.urls.static import static

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

#this will most likely be necessary for locally loading media
#if settings.DEBUG is True:
#	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


