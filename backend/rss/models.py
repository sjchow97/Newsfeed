from django.db import models
from django.contrib.auth.models import User

# Model for an RSS source with a name, URL to the XML feed, and associated location
class RssSource(models.Model):
    source_id = models.AutoField(primary_key=True)
    source_name = models.CharField(max_length=200)
    url = models.CharField(max_length=200) 
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.source_name

# Model for a reference to a RSS post with a unique reference_id
class PostReference(models.Model):
    reference_id = models.CharField(max_length=200, primary_key=True)

    def __str__(self):
        return self.reference_id

# Model for a comment on a post with a title, content, creation date, edited date, reference to the post, user, and parent comment
class PostComment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    post_title = models.CharField(max_length=80, null=True)
    content = models.CharField(max_length=800)
    creation_date = models.DateTimeField("date published")
    edited_date = models.DateTimeField("date edited", null=True)
    reference = models.ForeignKey(PostReference, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')

    def __str__(self):
        username = self.user.username if self.user and self.user.username else 'No username'
        post_title = self.post_title if self.post_title else 'No title'
        return username + ": " + post_title

# Model for a reaction to a post with a reference to the post, vote (like or dislike), and user
class PostReaction(models.Model):
    VOTE_CHOICES = [
        (1, 'Like'),
        (-1, 'Dislike'),
    ]

    reaction_id = models.AutoField(primary_key=True)
    reference = models.ForeignKey(PostReference, on_delete=models.CASCADE)
    vote = models.IntegerField(choices=VOTE_CHOICES)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.vote)

# Model for a reaction to a comment with a reference to the comment, vote (like or dislike), and user
class CommentReaction(models.Model):
    VOTE_CHOICES = [
        (1, 'Like'),
        (-1, 'Dislike'),
    ]

    comment = models.ForeignKey(PostComment, on_delete=models.CASCADE)
    vote = models.IntegerField(choices=VOTE_CHOICES)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.vote