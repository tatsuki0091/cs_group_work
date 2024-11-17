from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True)

    class Meta:
        model = User
        fields = '__all__'
