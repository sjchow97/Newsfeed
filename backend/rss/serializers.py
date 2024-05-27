from rest_framework import serializers
from django.contrib.auth.models import User
from .models import RssSource, PostReference, PostComment, PostReaction, CommentReaction

# RSSSource Serializer for the API
class RssSourceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('source_id', 'source_name', 'url', 'location')
        model = RssSource

# PostReference Serializer for the API
class PostReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('reference_id')
        model = PostReference  

# PostComment Serializer for the API
class PostCommentSerializer(serializers.ModelSerializer):
    reference = serializers.PrimaryKeyRelatedField(queryset=PostReference.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    parent = serializers.PrimaryKeyRelatedField(queryset=PostComment.objects.all(), allow_null=True)
    user_name = serializers.SerializerMethodField()

    class Meta:
        fields = ('comment_id', 'post_title', 'content', 'creation_date', 'edited_date', 'reference', 'user', 'parent', 'user_name')
        model = PostComment
    
    def get_user_name(self, obj):
        return obj.user.get_full_name()

# PostReaction Serializer for the API
class PostReactionSerializer(serializers.ModelSerializer):
    reference = serializers.PrimaryKeyRelatedField(queryset=PostReference.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        fields = ('reaction_id', 'reference', 'vote', 'user')
        model = PostReaction

# CommentReaction Serializer for the API
class CommentReactionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'comment', 'vote', 'user')
        model = CommentReaction