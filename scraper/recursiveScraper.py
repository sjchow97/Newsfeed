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
                            found_rss_feeds.add(full_rss_url)
                            print('RSS feed found on {}: {}'.format(url, full_rss_url))


                            try:
                                response = urllib2.urlopen(full_rss_url)

                                if response.getcode() == 200:
                                    html = response.read()
                                    soup = BeautifulSoup(html, 'html.parser')

                                    #find whether or not the content is in xml format
                                    if "<rss" in html or "<feed" in html:
                                        print("XML format detected")

                                        # These fields are related to the RssSource model
                                        print("BASE URL: " + full_rss_url)
                                        print("NAME: " + soup.title.string)
                                        # location needs to be based on csv file inputs
                                        print("LOCATION: " + municipality)
                                      
                                        # parse each <item> tag for fields that will be displayed on the news feed
                                        for item in soup.find_all('item'):
                                            title = item.find('title')
                                            description = item.find('description').get_text()
                                            link = item.find('link')
                                            pub_date = item.find('pubdate')


                                            unescaped_title = (HTMLParser.HTMLParser().unescape(title.get_text())).encode('utf-8')
                                            print "Unescaped title: " + unescaped_title
                                            
                                            # should probably not include items that do not have a pubdate onto the news feed
                                            if pub_date == None:
                                                print "No publication date found for this news item, skipping to next item"
                                                continue
                                            else:
                                                print "Publication date: " + pub_date.get_text()
                                        
      

                                            #this does not work, will print blank
                                            print (item.link).get_text()
                                            print "Link: " + link.get_text()

                                            #this works
                                            unescaped_description = (HTMLParser.HTMLParser().unescape(description)).encode('utf-8')
                                            print "Unescaped description: " + unescaped_description
                                            

                                            # if "CDATA" in description:
                                            #     cdata_removed = re.sub(r'<!\[CDATA\[(.*?)\]\]>', r'\1', unescaped_description)
                                            #     print cdata_removed.encode('utf-8')
                                            #     #print unescaped_description
                                            #     print "\n"
                                            # else:
                                            #     print "Unescaped description: " + unescaped_description
                                                
                                            
                                            #description_soup = BeautifulSoup(description, 'html.parser')

                                            # if description:
                                                
                                        
                                            #     description_soup = BeautifulSoup(description, 'html.parser')
                                            #     print(description_soup)
                                               
                                            #     if description_soup.find('description'):
                                            #         #test = description_soup.find('description').get_text()
                                            #         #print(test)
                                            #         print("d")

                                            #     # Continue with the rest of your code for processing the description content
                                            #     #description_content = description_soup.find('description').get('content')
                                            #     #print HTMLParser.HTMLParser().unescape(description_content)

                                            #     # Unescape the HTML entities
                                            #     #unescaped_content = HTMLParser.HTMLParser().unescape(description_content)

                                            #     #print(unescaped_content)
                                            # else:
                                            #     print("Description not found")

                                            # Extract the contents of the description tag
                                            # description_content = description_soup.find('description').get('content')

                                            # # Unescape the HTML entities
                                            # unescaped_content = HTMLParser.HTMLParser().unescape(description_content)

                                            # print(unescaped_content)


                                            #print("Title: " + item.title.text)
                                            #print("Description: " + HTMLParser.HTMLParser().unescape(item.description.text))
                                            #print("Link: " + item.link.text)
                                            # print HTMLParser.HTMLParser().unescape(item.description)
                                            
                                            # decoding the entities with nested tags causes issues
                                            #decoded_item = HTMLParser.HTMLParser().unescape(item.text)
                                            #print(decoded_item)

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
                        #if absolute_url.startswith(start_url) and any(substring in parsed_url.path for substring in ["feed", "rss", "xml"]):
                        if absolute_url.startswith(start_url):
                            queue.append(absolute_url)
            except Exception as e:
                print 'Error occurred while crawling {}: {}'.format(url, e)

# Example usage:
#crawl_website('https://vancouver.ca/')


with open('sample.csv', 'r') as file:
    # Create a CSV reader object
    csv_reader = csv.reader(file)
    
    count = 0

    for row in csv_reader:

        count+=1

        print count
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
                #print link
                
                crawl_website(link, municipality)

        except urllib2.HTTPError as e:
        # If an HTTP error occurs, print the status code and error message
            print("HTTP Error:", e.code, e.reason)