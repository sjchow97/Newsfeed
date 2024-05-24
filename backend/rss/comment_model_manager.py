from .models import PostComment, PostReference
from django.core.exceptions import PermissionDenied, ValidationError
from django.utils import timezone
from operator import attrgetter

def get_comments(reference_id):
    # return PostComment.objects.filter(reference=reference_id)
    comments = list(PostComment.objects.filter(reference=reference_id).order_by('-creation_date'))
    comments.sort(key=attrgetter('parent_id', 'creation_date'))
    print(comments)
    return comments

def add_comment(reference_id, user, post_title, content):
    reference, created = PostReference.objects.get_or_create(id=reference_id)
    comment = PostComment()
    comment.reference = reference
    comment.user = user
    comment.creation_date = timezone.now()
    if post_title:
        if len(post_title) > 80:
            raise ValidationError("Post title exceeds maximum length of 80 characters")
        comment.post_title = post_title
    if content:
        if len(content) > 800:
            raise ValidationError("Comment content exceeds maximum length of 800 characters")
        comment.content = content
    else:
        raise ValidationError("Comment content cannot be empty")
    comment.save()
    return comment

def edit_comment(comment_id, user, post_title, content):
    comment = PostComment.objects.get(comment_id=comment_id)
    comment.edited_date = timezone.now()
    if (comment.user != user):
        raise PermissionDenied("User does not have permission to edit this comment")
    if post_title:
        if len(post_title) > 80:
            raise ValidationError("Post title exceeds maximum length of 80 characters")
        comment.post_title = post_title
    if content:
        if len(content) > 800:
            raise ValidationError("Comment content exceeds maximum length of 800 characters")
        comment.content = content
    else:
        raise ValidationError("Comment content cannot be empty")
    comment.save()
    return comment

def delete_comment(comment_id, user):
    comment = PostComment.objects.get(comment_id=comment_id)
    if (comment.user != user):
        raise PermissionDenied("User does not have permission to delete this comment")
    comment.delete()