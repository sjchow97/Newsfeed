from django.conf.urls import url

from . import views
urlpatterns = [
    url(r'^csrf/$', views.csrf, name='csrf'),
    url(r'^login/$', views.Login.as_view(), name='login'),
    url(r'^logout/$', views.Logout.as_view(), name='logout'),
    # url(r'^home/$', views.Home),
    # url(r'^accounts/login/$', views.Login, name='login'),

]