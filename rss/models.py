from django.db import models

# Create your models here.

class PostReference(models.Model):
    reference_id = models.CharField(max_length=200, primary_key=True)
    source_id = models.IntegerField()

    def __str__(self):
        return self.reference_id

class FeedPost(models.Model):
    post_id = models.IntegerField(primary_key=True)
    post_title = models.CharField(max_length=200)
    content = models.CharField(max_length=200)
    link = models.CharField(max_length=200)
    creation = models.DateTimeField("date published")
    reference = models.ForeignKey(PostReference, on_delete=models.CASCADE)

    def __str__(self):
        return self.post_title

class FeedVote(models.Model):
    reaction_id = models.IntegerField(primary_key=True)
    reference = models.ForeignKey(PostReference, on_delete=models.CASCADE)
    vote = models.IntegerField()

    def __str__(self):
        return self.vote