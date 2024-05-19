import requests
from bs4 import BeautifulSoup
from urlparse import urljoin, urlparse
import urllib2
import HTMLParser
import re
import csv

checked_urls = set()
found_rss_feeds = set()

def find_rss_feed(url, municipality):
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
                            
                            print('Potential RSS Feed on the page:  {}: {}'.format(url, full_rss_url))

                            try:
                                response = urllib2.urlopen(full_rss_url)

                                if response.getcode() == 200:
                                    html = response.read()
                                    soup = BeautifulSoup(html, 'html.parser')

                                    #find whether or not the content is a RSS feed, which will contain the <rss> or <feed> tag
                                    if "<rss" in html or "<feed" in html:
                                       
                                        print('RSS feed found on {}: {}'.format(url, full_rss_url))
                                        found_rss_feeds.add(full_rss_url)

                                        # These fields are related to the RssSource model
                                        print("BASE URL: " + full_rss_url)
                                        print("NAME: " + soup.title.string)
                                        # location needs to be based on csv file inputs
                                        print("LOCATION: " + municipality)

                                        # create new RssSource object
                                        # rss_source = RssSource.objects.create(url=full_rss_url, source_name=soup.title.string, location=municipality)
                                        # rss_source.save()

                                        items = soup.find_all('item')
                                        print "NUMBER OF ITEMS: " + str(len(items))

                                        if len(items) > 0:
                                            rss_source = RssSource.objects.create(url=full_rss_url, source_name=soup.title.string, location=municipality)
                                            rss_source.save()

                                        # parse each <item> tag for fields that will be displayed on the news feed
                                        for item in items:
                                            title = item.find('title')
                                            description = item.find('description').get_text()
                                            link = item.find('link')
                                            pub_date = item.find('pubdate')

                                            # unescape the title to remove any html entities and encode it to utf-8
                                            unescaped_title = (HTMLParser.HTMLParser().unescape(title.get_text())).encode('utf-8')
                                            print "Title: " + unescaped_title
                                            
                                            # do not include items that do not have a pubdate onto the news feed
                                            if pub_date == None:
                                                print "No publication date found for this news item, skipping to next item"
                                                continue
                                            else:
                                                print "Publication date: " + pub_date.get_text()

                                            # retrieving link of RSS feed items needs work, will print out as empty string
                                            #print (item.link).get_text()
                                            #print "Link: " + link.get_text()

                                            # unescape the description to remove any html entities and encode it to utf-8
                                            unescaped_description = (HTMLParser.HTMLParser().unescape(description)).encode('utf-8')
                                            print "Description: " + unescaped_description
                                    else:
                                        
                                        # recursive search as some sites will have multiple feeds listed on the /rss page such as coquitlam https://www.coquitlam.ca/rss.aspx
                                        find_rss_feed(full_rss_url, municipality)
                                        
                            except urllib2.HTTPError as e:
                            # If an HTTP error occurs, print the status code and error message
                                print("HTTP Error:", e.code, e.reason)
            else:
                print('No RSS feed found on:', url)
        else:
            print('Failed to fetch {}: Status code {}'.format(url, response.status_code))
    except Exception as e:
        print('Error occurred while fetching {}: {}'.format(url, e))

def crawl_website(start_url, municipality):
    visited_urls = set()
    queue = [start_url]

    print 'Crawling website for: ' + municipality

    while queue:
        url = queue.pop(0)
        if url not in visited_urls:
            find_rss_feed(url, municipality)
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
                        if absolute_url.startswith(start_url):
                            queue.append(absolute_url)
            except Exception as e:
                print 'Error occurred while crawling {}: {}'.format(url, e)


# Read the CSV file containing the municipalities, search for the Wikipedia page of each municipality, and find the official website, performs a recursive crawl for RSS feeds
with open('sample.csv', 'r') as file:
    # Create a CSV reader object
    csv_reader = csv.reader(file)
    
    for row in csv_reader:

        municipality = row[0]
        if " " in municipality:
            municipality = municipality.replace(" ", "_")
        province = row[1]
        if " " in province:
            province = province.replace(" ", "_")
        
        wiki_site = "https://en.wikipedia.org/wiki/{},_{}".format(municipality, province)

        try:
            response = urllib2.urlopen(wiki_site)

            if response.getcode() == 200:
                html = response.read()
                soup = BeautifulSoup(html, 'html.parser')

                # Find the <a> tag within the <span> tags with class "official-website" and get the href attribute
                link = soup.find('span', class_='official-website').find('a').get('href')
                
                crawl_website(link, municipality)

        except urllib2.HTTPError as e:
        # If an HTTP error occurs, print the status code and error message
            print("HTTP Error:", e.code, e.reason)