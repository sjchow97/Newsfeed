import requests
from bs4 import BeautifulSoup
from urlparse import urljoin, urlparse

checked_urls = set()
found_rss_feeds = set()

def find_rss_feed(url):
    global checked_urls
    global found_rss_feeds
    try:
        if url in checked_urls:
            print('URL already checked:', url)
            return
        checked_urls.add(url)

        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            # Look for <link> and <a> tags
            rss_links = soup.find_all(['link', 'a'])
            if rss_links:
                for link in rss_links:
                    rss_url = link.get('href')
                    # Check if the URL contains "rss" or "feed/" (important to check for feed/ otherwise common URLs like /feedback will be included as well)
                    if rss_url and ('rss' in rss_url.lower() or 'feed/' in rss_url.lower()):
                        full_rss_url = urljoin(url, rss_url)
                        if full_rss_url not in found_rss_feeds:
                            found_rss_feeds.add(full_rss_url)
                            print('RSS feed found on {}: {}'.format(url, full_rss_url))
            else:
                print('No RSS feed found on:', url)
        else:
            print('Failed to fetch {}: Status code {}'.format(url, response.status_code))
    except Exception as e:
        print('Error occurred while fetching {}: {}'.format(url, e))

def crawl_website(start_url):
    visited_urls = set()
    queue = [start_url]

    while queue:
        url = queue.pop(0)
        if url not in visited_urls:
            find_rss_feed(url)
            visited_urls.add(url)
            try:
                response = requests.get(url)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.content, 'html.parser')
                    # Find all <a> tags and enqueue their URLs for further crawling
                    for link in soup.find_all('a', href=True):
                        absolute_url = urljoin(url, link['href'])
                        parsed_url = urlparse(absolute_url)
                        base_path = urlparse(start_url).path

            

                        # Ensures that the script only check the URLs within the same domain
                        #if absolute_url.startswith(start_url) and any(substring in parsed_url.path for substring in ["feed", "rss", "xml"]):
                        if absolute_url.startswith(start_url):
                            queue.append(absolute_url)
            except Exception as e:
                print 'Error occurred while crawling {}: {}'.format(url, e)

# Example usage:
crawl_website('https://vancouver.ca/')