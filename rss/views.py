from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.template.defaultfilters import slugify


from .models import PostReference, FeedPost, FeedVote

import feedparser


# Create your views here.

def index(request):
    feeds = feedparser.parse("https://www.coquitlam.ca/RSSFeed.aspx?ModID=76&CID=All-0")
    entry_dict = {}
    for entry in feeds.entries:
        print(entry)
        reference_id = entry.title
        slugified_title = slugify(reference_id)
        if PostReference.objects.filter(reference_id=reference_id).exists():
            reference = PostReference.objects.get(reference_id=reference_id)
            comments = reference.feedpost_set.all()
            entry_dict[slugified_title] = comments
            print(comments)
        else:
            print("Does not exist")
    template = loader.get_template("rss/index.html")
    context = {
        "feeds": feeds,
        "post_comments": entry_dict
    }
    return HttpResponse(template.render(context, request))