from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from accounts.models import UserProfile

class Command(BaseCommand):
    help = 'Seed custom users'

    def handle(self, *args, **kwargs):
        # Logic to create custom users
        stanley = User.objects.create_user(username='stanley', email='stanley@placespeak.com', password='password', first_name='Stanley', last_name='Chow')
        lester = User.objects.create_user(username='lester', email='lester@placespeak.com', password='password', first_name='Lester', last_name='Shun')

     
        UserProfile.objects.create(user=stanley, location='Vancouver, BC')
        UserProfile.objects.create(user=lester, location='Coquitlam, BC')

     