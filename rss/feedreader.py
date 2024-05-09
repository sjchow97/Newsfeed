from operator import attrgetter
from .models import RssSource

import feedparser

class FeedReader(object):
    @staticmethod
    def get_feeds(location):
        rss_sources = RssSource.objects.filter(location=location)
        feeds = feedparser.FeedParserDict()
        feeds['entries'] = []

        for source in rss_sources:
            feed = feedparser.parse(source.url)
            feeds['entries'].extend(feed.entries)
        feeds['entries'].sort(key=attrgetter('published_parsed'), reverse=True)
        return feeds