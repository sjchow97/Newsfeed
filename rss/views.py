from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.template.defaultfilters import slugify
from .feedreader import FeedReader

from .models import PostReference, PostComment, PostReaction


# Create your views here.

def index(request):
    feeds = FeedReader.get_feeds(request.user.userprofile.location)
    entry_dict = {}
    for entry in feeds.entries:
        reference_id = entry.title
        slugified_title = slugify(reference_id)
        if PostReference.objects.filter(reference_id=reference_id).exists():
            reference = PostReference.objects.get(reference_id=reference_id)
            comments = reference.postcomment_set.all()
            entry_dict[slugified_title] = comments
            print(comments[0].content)
    template = loader.get_template("rss/index.html")
    context = {
        "feeds": feeds,
        "post_comments": entry_dict
    }
    return HttpResponse(template.render(context, request))