from rest_framework import serializers
from .models import UserProfile

# User Profile serializer with additional location field
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('user', 'location')
        model = UserProfile