"""
This script will be used to scrape the municipality RSS URLs from the CSV file containing all the municipalities.
In order to run the script, ensure that the CSV file is in the same directory as this script, and run python municipalityScraper.py.
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
        print(wiki_site)

        try:
            response = urllib2.urlopen(wiki_site)

            if response.getcode() == 200:
                html = response.read()
                soup = BeautifulSoup(html, 'html.parser')
        
        except urllib2.HTTPError as e:
        # If an HTTP error occurs, print the status code and error message
        print("HTTP Error:", e.code, e.reason)




        




