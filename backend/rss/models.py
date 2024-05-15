from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class RssSource(models.Model):
    source_id = models.IntegerField(primary_key=True)
    source_name = models.CharField(max_length=200)
    url = models.CharField(max_length=200) 
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.source_name

class PostReference(models.Model):
    reference_id = models.CharField(max_length=200, primary_key=True)
    source_id = models.IntegerField()

    def __str__(self):
        return self.reference_id

class PostComment(models.Model):
    comment_id = models.IntegerField(primary_key=True)
    post_title = models.CharField(max_length=80, null=True)
    content = models.CharField(max_length=800)
    creation_date = models.DateTimeField("date published")
    edited_date = models.DateTimeField("date edited", null=True)
    reference = models.ForeignKey(PostReference, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return (self.user.username + ": " + self.post_title)

class PostReaction(models.Model):
    VOTE_CHOICES = [
        (1, 'Like'),
        (-1, 'Dislike'),
    ]

    reaction_id = models.IntegerField(primary_key=True)
    reference = models.ForeignKey(PostReference, on_delete=models.CASCADE)
    vote = models.IntegerField(choices=VOTE_CHOICES)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.vote