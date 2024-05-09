from .models import PostComment

class CommentModelManager:
    @staticmethod
    def get_comments(reference_id):
        return PostComment.objects.filter(reference=reference_id)
    
    @staticmethod
    def add_comment(reference_id, user, post_title, content, link):
        comment = PostComment()
        comment.reference = reference_id
        comment.user = user
        comment.post_title = post_title
        comment.content = content
        comment.link = link
        comment.save()
        return comment
