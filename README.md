# Introduction

This repository contains code for the PlaceSpeak Newsfeed application, as provided by Team 22 for COMP 4800.
A web application and web scraper script are included.

# Technologies

Web Scraper - written with Python 2.7.18

Web Application:

- Backend - Django 1.8.17 (on top of Python 2.7.18)
- Frontend - React v0.14
- Database - SQLite

# Login Accounts

Once the Frontend and Backend servers are running locally, navigate to `http://localhost:9000` to login.

login with one of the test accounts:

user: stanley

pass: password

(locale is Vancouver, BC)

user: lester

pass: password

(locale is Coquitlam, BC)

# Web Application

Note this repository only includes code relating to local news RSS feeds, please see [fcv-redesign repo](https://github.com/PlaceSpeak/fcv-redesign)

## Development Environment Setup

Please follow all subsequent Backend and Frontend steps to start the development servers locally.

### Backend Django App

#### Installing Packages

The application has multiple required packages in order to run. They are outlined in `rss_requirements.txt`.
In order to install all packages at once, ensure you are in the `/backend` directory, then run the following command:

```
pip install -r rss_requirements.txt
```

#### Seeding the Database

Seeder scripts are found in an app's management/commands path. Ensure there is an **init**.py file in each these subdirectories, even if they are empty!

To seed the database, ensure you are in the `/backend` directory, then run the following command:

```
python manage.py seed
```

### Frontend Django App

In order to install all modules, ensure you are in the `/frontend` directory, then run the following command:

```
npm i
```

## Starting up the Application

Ensure that both the backend and frontend servers are running for the application to function properly.

### Backend Django App

To start the backend, ensure you are in the `/backend` directory, then run the following command:

```
python manage.py runserver
```

### Frontend React App

To start the frontend UI, ensure you are in the `/frontend` directory, then run the following command:

```npm start

```

The frontend can be viewed at http://localhost:9000.

# Web Scraper

To seed the database with RssSources, ensure you are in the `/backend/scraper` directory, then run the following command:

```
python recursiveScraper.py
```

This is executed through a recursive crawl through the website urls starting from the home page. As crawling throughout an entire website is a resource-intensive process, each site is alloted a timeout duration before proceeding to the next site. This duration is defined in line 144 in `recursiveScraper.py`, and can be increased to allow for a larger search time at the expense of runtime. Potential performance gains can be realized by offloading compute to a more capable machine, such as a Kubernetes cluster scaled to numerous pods.

The input municipalities and media outlets are defined in `media_outlets.xlsx` and `municipalities.xlsx`. Refer to the formats in these files. Ensure that the excel files are in the same directory as `recusiveScraper.py`. A significant blocker to the input websites is that many of them (media outlets, especially) restrict access to bot activity, thus preventing web scraping or crawling, or impose rate limits (anti-DDOS measures), resulting in HTTP errors 403 or 429. To resolve this issue, PlaceSpeak could look into requesting access from such sources. Potential solutions include granting authorization headers/access tokens, or access to their APIs to request relevant RSS news feeds.

At the time of handover, the web scraping tool is a proof of concept. In addition to the access permissions described above, future work might also include adding additional logic to narrow down the search scope of the crawl in order to reduce runtime.

Please refer to inline documentation in `recursiveScraper.py` for specific implementation details.

# Repository Structure

The repository is laid out in the following structure:

```

.
├── backend - directory containing Django code
│ ├── accounts - Django app related to user accounts
│ ├── newsfeed - main Django app tying all pieces together
│ ├── rss - Django app related to displaying RSS feeds and CRUD of comments
│ ├── scraper - directory containing web scraper script and excel files for input
│ ├── .gitignore
│ ├── db.sqlite3 - SQLite database
│ ├── manage.py - starting point for backend Django server
│ └── rss_requirements.txt - text file containing relevant packages used by the backend
├── frontend - directory containing React code
│ ├── node_modules - directory containing all relevant node package modules used by the frontend
│ ├── src - directory containing React code
│ │ ├── Components - directory containing individual React components, with JS and CSS files
│ │ ├── Context - contains file for providing authentication context to components
│ │ ├── Pages - contains React components specifically for page layout
│ │ ├── utils - files containing reused functions for HTTP requests, and authentication handling
│ └── public - directory contains static assets (images, favicon)
└── README.md
```
