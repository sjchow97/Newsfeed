from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from accounts.models import UserProfile

class Command(BaseCommand):
    help = 'Seed custom users'

    def handle(self, *args, **kwargs):
        # Logic to create custom users
        # stanley = User.objects.create_user(username='stanley', email='stanley@placespeak.com', password='password', first_name='Stanley', last_name='Chow')
        # lester = User.objects.create_user(username='lester', email='lester@placespeak.com', password='password', first_name='Lester', last_name='Shun')
        brandon = User.objects.create_user(username='brandon', email='brandon@placespeak.com', password='g3kk0!23', first_name='Brandon', last_name='Chan')
        nanak = User.objects.create_user(username='nanak', email='nanak@placespeak.com', password='P1zz@123', first_name='Nanak', last_name='Singh')
        tushar = User.objects.create_user(username='tushar', email='tushar@placespeak.com', password='buBBleT##', first_name='Tushar', last_name='Gandhi')

        # UserProfile.objects.create(user=stanley, location='Vancouver, British Columbia')
        # UserProfile.objects.create(user=lester, location='Coquitlam, British Columbia')
        UserProfile.objects.create(user=brandon, location='Banff, Alberta')
        UserProfile.objects.create(user=nanak, location='Toronto, Ontario')
        UserProfile.objects.create(user=tushar, location='Vancouver, British Columbia')

     