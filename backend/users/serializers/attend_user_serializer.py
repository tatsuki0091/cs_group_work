from rest_framework import serializers
from users.models import User
from events.serializers.event_serializer import EventSerializer


class AttendUserSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True)

    class Meta:
        model = User
        fields = '__all__'
