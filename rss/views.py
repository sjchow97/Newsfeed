from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .feed_reader import get_feeds
from .comment_model_manager import get_comments
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