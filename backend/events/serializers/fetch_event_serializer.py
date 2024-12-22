from events.models import Event
from rest_framework import serializers


class FetchEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
