from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.template.defaultfilters import slugify
from .feed_reader import FeedReader
from .comment_model_manager import CommentModelManager
from .reaction_model_manager import ReactionModelManager

from .models import PostReference, PostComment, PostReaction


# Create your views here.

def index(request):
    feeds = FeedReader.get_feeds(request.user.userprofile.location)
    comment_dict = {}
    reaction_dict = {}
    for entry in feeds.entries:
        reference_id = entry.title
        slugified_title = slugify(reference_id)
        if PostReference.objects.filter(reference_id=reference_id).exists():
            reference = PostReference.objects.get(reference_id=reference_id)
            comments = CommentModelManager.get_comments(reference)
            reactions = ReactionModelManager.get_reactions(reference)
            comment_dict[slugified_title] = comments
            reaction_dict[slugified_title] = reactions
    template = loader.get_template("rss/index.html")
    context = {
        "feeds": feeds,
        "post_comments": comment_dict,
        "post_reactions": reaction_dict,
    }
    return HttpResponse(template.render(context, request))