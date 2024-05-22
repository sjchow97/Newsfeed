from rest_framework import serializers
from django.contrib.auth.models import User
from .models import RssSource, PostReference, PostComment, PostReaction, CommentReaction

class RssSourceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('source_id', 'source_name', 'url', 'location')
        model = RssSource

class PostReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('reference_id')
        model = PostReference  

class PostCommentSerializer(serializers.ModelSerializer):
    reference = serializers.PrimaryKeyRelatedField(queryset=PostReference.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    parent = serializers.PrimaryKeyRelatedField(queryset=PostComment.objects.all(), allow_null=True)

    class Meta:
        fields = ('comment_id', 'post_title', 'content', 'creation_date', 'edited_date', 'reference', 'user', 'parent')
        model = PostComment

class PostReactionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('reaction_id', 'reference', 'vote', 'user')
        model = PostReaction

class CommentReactionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'comment', 'vote', 'user')
        model = CommentReaction