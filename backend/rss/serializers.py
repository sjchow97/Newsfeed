from rest_framework import serializers
from .models import RssSource, PostReference, PostComment, PostReaction

class RssSourceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('source_id', 'source_name', 'url', 'location')
        model = RssSource

class PostReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('reference_id', 'source_id')
        model = PostReference  

class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('comment_id', 'post_title', 'content', 'creation_date', 'edited_date', 'reference', 'user')
        model = PostComment

class PostReactionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('reaction_id', 'reference', 'vote', 'user')
        model = PostReaction

