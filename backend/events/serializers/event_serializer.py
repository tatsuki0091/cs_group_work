from events.models import Event
from rest_framework import serializers
from common.mixins.trim_string_fields_mixin import TrimStringFieldsMixin


class EventSerializer(TrimStringFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'address', 'description', 'latitude', 'longitude',
                  'event_start_date_time', 'event_end_date_time', 'organizer', 'created', 'updated']
