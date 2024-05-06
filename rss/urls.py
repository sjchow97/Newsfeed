from django.conf.urls import url

from . import views

app_name = "rss"
urlpatterns = [
    url("", views.index, name="index"),
]