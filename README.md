Seeder scripts are found in an app's management/commands path. Ensure there is an **init**.py file in each these subdirectories, even if they are empty!

To seed the database: python manage.py seed

Start the app: python manage.py runserver

Head to http://localhost:8000/accounts/login/

login with one of the test accounts:

user: stanley
pass: password

user: lester
pass: password

### Required Packages

The application has multiple required packages in order to run. They are outlined in `rss_requirements.txt`.

In order to install all packages at once, run the command `pip install -r rss_requirements.txt` in the root directory.
