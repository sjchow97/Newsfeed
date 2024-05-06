Seeder scripts are found in an app's management/commands path. Ensure there is an __init__.py file in each these subdirectories, even if they are empty!

To seed the database: python manage.py seed

Start the app: python manage.py runserver

Head to http://localhost:8000/accounts/login/

login with one of the test accounts:

user: stanley

pass: password


user: lester

pass: password
