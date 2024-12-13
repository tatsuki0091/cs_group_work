
from rest_framework import generics
from events.serializers.fetch_event_serializer import FetchEventSerializer
from rest_framework.response import Response
from events.models import Event
from dateutil import parser
import pytz
from datetime import datetime, timezone


class FetchEvent(generics.GenericAPIView):
    # Need serializer_class
    serializer_class = FetchEventSerializer

    def get(self, request):
        try:
            date_from = request.GET.get('dateFrom')
            date_to = request.GET.get('dateTo')
            parsed_date_from = parser.parse(date_from)
            parsed_date_to = parser.parse(date_to)
            time_zone = pytz.timezone(request.GET.get('timeZone'))
            place_date_from = parsed_date_from.astimezone(time_zone)
            place_date_to = parsed_date_to.astimezone(time_zone)
            eventInfo = Event.objects.filter(
                date__gte=place_date_from, date__lte=place_date_to)
            print(eventInfo)
            serializer = FetchEventSerializer(eventInfo, many=True)
            print(serializer)
            print(len(serializer.data))
            return Response({'eventInfo': serializer.data}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=400)
