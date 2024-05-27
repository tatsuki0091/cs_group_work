from django.db import models
import datetime


# Create your models here.
class User(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.DateField(default=datetime.date.today)
    introduction = models.CharField(max_length=500)
    created = models.DateField(default=datetime.date.today)
    updated = models.DateField(blank=True)