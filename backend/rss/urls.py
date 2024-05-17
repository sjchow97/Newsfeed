from django.conf.urls import url

from . import views

app_name = "rss"
urlpatterns = [
    url(r'^post_comment/$', views.create_post_comment, name="post_comment"),
    url(r'^edit_comment/(?P<comment_id>\d+)/$', views.edit_post_comment, name="edit_comment"),
    url(r'^delete_comment/(?P<comment_id>\d+)/$', views.delete_post_comment, name="delete_comment"),
    url(r'^list_comments/$', views.list_comments, name="list_comments"),
    url(r'^read_feeds/', views.read_feeds, name="read_feeds"),
]