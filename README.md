# Introduction

<!-- Add description of the project, ie webapp and scraper -->

Head to http://localhost:8000/accounts/login/

login with one of the test accounts:

user: stanley
pass: password
(locale is Vancouver, BC)

user: lester
pass: password
(locale is Coquitlam, BC)

# Web Application

## Development Environment Setup

### Backend Django App

#### Installing Packages

The application has multiple required packages in order to run. They are outlined in `rss_requirements.txt`.
In order to install all packages at once, run the command `pip install -r rss_requirements.txt` in the `backend` directory.

#### Seeding the Database

Seeder scripts are found in an app's management/commands path. Ensure there is an **init**.py file in each these subdirectories, even if they are empty!

To seed the database, run the command `python manage.py seed` in the `backend` directory.

### Frontend Django App

In order to install all modules, run the command `npm i` in the `frontend directory.

## Starting up the Application

Ensure that both the backend and frontend are running for the application to function properly.

### Backend Django App

To start the backend, change directory to `backend`, then run `python manage.py runserver`.

### Frontend React App

To start the frontend UI, change directory to `frontend`, then run `npm start`.
The frontend can be viewed at http://localhost:3000.

# Web Scraper

<!-- insert web scraper documentation here -->

# Repository Structure

The repository is laid out in the following structure:

<!-- add tree structure outlining repo here! -->
