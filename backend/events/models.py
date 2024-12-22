from django.db import models
from datetime import datetime
from users.models import User

# Create your models here.


class Event(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    time_zone = models.CharField(max_length=100, default='America/Los_Angeles')
    address = models.CharField(max_length=300, default='')
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    date = models.DateTimeField(default=datetime.now)
    participants = models.ManyToManyField(
        User, related_name='participated_events')
    organizer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='organized_events')
    created = models.DateTimeField(default=datetime.now)
    updated = models.DateTimeField(default=datetime.now, blank=True)
