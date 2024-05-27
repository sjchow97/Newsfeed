from django.db import models
from django.contrib.auth.models import User

# UserProfile that extends the User model from Django auth module with an 
#   additional location field.
class UserProfile(models.Model):
    user = models.OneToOneField(User)
    location = models.CharField(max_length=100)