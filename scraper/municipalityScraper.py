"""
This script will be used to scrape the municipality RSS URLs from the CSV file containing all the municipalities.

In order to run the script, ensure that the CSV file is in the same directory as this script, and run python municipalityScraper.py.
Also ensure that the package BeautifulSoup is installed by running pip install beautifulsoup4.

The script will output a CSV file containing the municipality name and the RSS URL.
Using python version 2.7.18
"""
import csv
import urllib2
from bs4 import BeautifulSoup

# Open the CSV file
with open('bc.csv', 'r') as file:
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
                
                # Figure out how to handle case where its "/sitemap.xml" or just "/sitemap"
                link = link + "/sitemap.xml"
                city_site = urllib2.urlopen(link)
                if city_site.getcode() == 200:
                    city_sitemap_xml = city_site.read()
                    city_soup = BeautifulSoup(city_sitemap_xml, 'html.parser')
                    # Need to find all RSS urls in the sitemap
                    for url in city_soup.find_all('url'):
                        loc = url.find('loc').text
                        print(loc)

        except urllib2.HTTPError as e:
        # If an HTTP error occurs, print the status code and error message
            print("HTTP Error:", e.code, e.reason)