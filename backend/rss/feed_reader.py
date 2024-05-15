from operator import attrgetter
from .models import RssSource

import feedparser

def get_feeds(location):
    rss_sources = RssSource.objects.filter(location=location)
    feeds = feedparser.FeedParserDict()
    feeds['entries'] = []

    for source in rss_sources:
        feed = feedparser.parse(source.url)
        if feed.bozo:
            print("Error reading feed: " + feed.bozo_exception)
            continue
        else:
            feeds['entries'].extend(feed.entries)
    feeds['entries'].sort(key=attrgetter('published_parsed'), reverse=True)
    return feeds