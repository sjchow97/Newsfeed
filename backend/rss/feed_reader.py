from operator import attrgetter
from .models import RssSource

import feedparser
import time

# Gets all the RSS feed entries given a location
# params: location string
# returns: FeedParserDict object containing the feed entries
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

# Converts a FeedParserDict object to a JSON object and also filters out data that is not needed
# params: feed is a list of feed entries (which are FeedParserDict objects)
# returns: JSON object containing the feed data
def feed_to_json(feed):
    def convert_value(key, value):
        if isinstance(value, time.struct_time):
            return time.strftime("%Y-%m-%d %H:%M:%S", value)
        elif isinstance(value, feedparser.FeedParserDict):
            return feed_to_json(value) if key != 'summary_detail' else value['base']
        elif isinstance(value, list):
            return [feed_to_json(item) if isinstance(item, feedparser.FeedParserDict) else item for item in value]
        else:
            return value

    return [
        {
            key: convert_value(key, value)
            for key, value in entry.items()
            if key in ["title", "summary", "description", "published", "link", "published_parsed", "summary_detail", "uuid", "image"]
        }
        for entry in feed
    ]
