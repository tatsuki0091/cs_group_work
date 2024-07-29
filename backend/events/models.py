from django.db import models
import datetime
from users.models import User

# Create your models here.


class Event(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    latitude = models.IntegerField()
    longitude = models.IntegerField()
    date = models.DateField(default=datetime.date.today)
    organizer = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateField(default=datetime.date.today)
    updated = models.DateField(blank=True)
