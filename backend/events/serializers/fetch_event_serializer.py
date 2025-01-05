from events.models import Event
from rest_framework import serializers
from users.serializers.fetch_event_user_serializer import FetchEventUserSerializer


class FetchEventSerializer(serializers.ModelSerializer):
    # For join table
    organizer = FetchEventUserSerializer()

    class Meta:
        model = Event
        fields = '__all__'
