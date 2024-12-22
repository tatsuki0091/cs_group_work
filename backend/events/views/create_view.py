from rest_framework import generics

from users.models import User
from events.serializers.event_serializer import EventSerializer
from rest_framework.decorators import api_view
# To return JSON
from rest_framework.response import Response
from rest_framework import status
from decimal import Decimal, ROUND_DOWN
from datetime import datetime
from rest_framework_simplejwt.tokens import AccessToken
from utills.user_utils import get_payload


class CreateEvent(generics.CreateAPIView):
    # Need serializer_class
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        # Copy request data
        dataCopy = request.data.copy()
        print(dataCopy)
        # Format the date
        date = dataCopy['date']
        dateFormat = datetime.strptime(
            date, "%Y-%m-%dT%H:%M:%S.%fZ")

        # Convert the longitude and latitude
        convertLongitude = Decimal(dataCopy['longitude'])
        roundDownLongitude = convertLongitude.quantize(
            Decimal('0.001'), rounding=ROUND_DOWN)
        convertLatitude = Decimal(dataCopy['latitude'])
        roundDownLatitude = convertLatitude.quantize(
            Decimal('0.001'), rounding=ROUND_DOWN)

        # Set editted data
        dataCopy['date'] = dateFormat
        dataCopy['longitude'] = roundDownLongitude
        dataCopy['latitude'] = roundDownLatitude

        # Fetch and set user id
        payload = get_payload(request.COOKIES.get('access_token'))
        userInfo = User.objects.get(username=payload['username'])
        dataCopy['organizer'] = userInfo.id

        # Set to the serializer
        serializer = self.get_serializer(data=dataCopy)
        if serializer.is_valid():
            # Register the data
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            # Response error message
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
