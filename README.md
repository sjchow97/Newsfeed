# Introduction

This repository contains code for the PlaceSpeak Newsfeed application, as provided by Team 22 for COMP 4800.
A web application and web scraper script are included.

# Technologies

Web Scraper - written with Python 2.7.18

Web Application:

- Backend - Django 1.8.17 (on top of Python 2.7.18)
- Frontend - React v18.3.1

# Login Accounts

Once the Frontend and Backend servers are running locally, navigate to `localhost:3000` to login.

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
In order to install all packages at once, run the command `pip install -r rss_requirements.txt` in the `/backend` directory.

#### Seeding the Database

Seeder scripts are found in an app's management/commands path. Ensure there is an **init**.py file in each these subdirectories, even if they are empty!

To seed the database, run the command `python manage.py seed` in the `/backend` directory.

### Frontend Django App

In order to install all modules, run the command `npm i` in the `/frontend` directory.

## Starting up the Application

Ensure that both the backend and frontend servers are running for the application to function properly.

### Backend Django App

To start the backend, change directory to `backend`, then run `python manage.py runserver`.

### Frontend React App

To start the frontend UI, change directory to `frontend`, then run `npm start`.
The frontend can be viewed at http://localhost:3000.

# Web Scraper

<!-- insert web scraper documentation here! -->

# Repository Structure

The repository is laid out in the following structure:

```
.
├── backend - directory containing Django code
│ ├── accounts - Django app related to user accounts
│ ├── newsfeed - main Django app tying all pieces together
│ ├── rss - Django app related to displaying RSS feeds and CRUD of comments
│ ├── .gitignore
│ ├── db.sqlite3 - SQLite database
│ ├── manage.py - starting point for backend Django server
│ └── rss_requirements.txt - text file containing relevant packages used by the backend
├── frontend - directory containing React code
│ ├── node_modules - directory containing all relevant node package modules used by the frontend
│ ├── src - directory containing React code
│ │ ├── components - directory containing individual react components, with JSX and CSS
│ └── public - directory contains static assets
└── README.md
```

<!-- insert web scraper into structure later -->
