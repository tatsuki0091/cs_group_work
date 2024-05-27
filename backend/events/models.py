from django.db import models
import datetime
from users.models import User 

# Create your models here.
class Event(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    date = models.DateField(default=datetime.date.today)
    organizer = ForeignKey(User, on_delete=CASCADE)
    created = models.DateField(default=datetime.date.today)
    updated = models.DateField(blank=True)