from django.conf.urls import url

from . import views

app_name = "rss"
urlpatterns = [
    # url("", views.index, name="index"),
    # url("post_comment/", views.post_comment, name="post_comment"),
    # url("edit_comment/", views.edit_comment, name="edit_comment"),
    # url("delete_comment/", views.delete_comment, name="delete_comment"),
    url("", views.ListComments.as_view()),
]