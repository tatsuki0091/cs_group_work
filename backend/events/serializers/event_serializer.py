from events.models import Event
from rest_framework import serializers


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'address', 'description', 'latitude', 'longitude',
                  'date', 'organizer', 'created', 'updated']
