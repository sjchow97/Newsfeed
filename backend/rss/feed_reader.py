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
# params: feed FeedParserDict object
# returns: JSON object containing the feed data
def feed_to_json(feed):
    json_feed = {}

    for key, value in feed.items():
        # filters out data that is not needed
        if key not in ["entries", "title", "summary", "description", "published", "link", "published_parsed", "summary_detail"]:
            continue
            
        if isinstance(value, time.struct_time):
            # Convert time.struct_time to string
            json_feed[key] = time.strftime("%Y-%m-%d %H:%M:%S", value)
        elif isinstance(value, feedparser.FeedParserDict):
            # Special handling for 'summary_detail'
            if key == 'summary_detail':
                json_feed['base'] = value['base']
            else:
                # Recursively convert FeedParserDict to dictionary
                json_feed[key] = feed_to_json(value)
        elif isinstance(value, list):
            # Convert each item in the list
            json_feed[key] = [feed_to_json(item) if isinstance(item, feedparser.FeedParserDict) else item for item in value]
        else:
            json_feed[key] = value

    return json_feed