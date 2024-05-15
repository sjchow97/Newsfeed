from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.core.exceptions import ValidationError

from .feed_reader import get_feeds
from .comment_model_manager import get_comments, add_comment, edit_comment, delete_comment
from .reaction_model_manager import get_reactions

from .models import PostReference

import uuid

# Create your views here.

REFERENCE_NAMESPACE = uuid.UUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')

def index(request):
    feeds = get_feeds(request.user.userprofile.location)
    comment_dict = {}
    reaction_dict = {}
    for entry in feeds.entries:
        reference_id = uuid.uuid5(REFERENCE_NAMESPACE, entry.title.encode('utf-8'))
        print("id: " + str(reference_id))
        if PostReference.objects.filter(reference_id=reference_id).exists():
            print("Reference exists")
            reference = PostReference.objects.get(reference_id=reference_id)
            comments = get_comments(reference)
            reactions = get_reactions(reference)
            comment_dict[reference_id] = comments
            reaction_dict[reference_id] = reactions
    template = loader.get_template("rss/index.html")
    context = {
        "feeds": feeds,
        "post_comments": comment_dict,
        "post_reactions": reaction_dict,
    }
    return HttpResponse(template.render(context, request))

# @csrf_exempt
def post_comment(request):
    if request.method == 'POST':
        reference_id = request.POST['reference_id']
        post_title = request.POST['post_title']
        content = request.POST['content']
        user = request.user

        try: 
            add_comment(reference_id, user, post_title, content)
            return JsonResponse({'status': 'success', 'message': 'Comment added successfully'})
        except ValidationError as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

# @csrf_exempt
def edit_comment(request):
    if request.method == 'POST':
        comment_id = request.POST['comment_id']
        post_title = request.POST['post_title']
        content = request.POST['content']
        user = request.user

        try: 
            edit_comment(comment_id, user, post_title, content)
            return JsonResponse({'status': 'success', 'message': 'Comment edited successfully'})
        except ValidationError as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

# @csrf_exempt
def delete_comment(request):
    if request.method == 'POST':
        comment_id = request.POST['comment_id']
        user = request.user

        try: 
            delete_comment(comment_id, user)
            return JsonResponse({'status': 'success', 'message': 'Comment deleted successfully'})
        except ValidationError as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})