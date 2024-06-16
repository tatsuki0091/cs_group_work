from django.db import models
import datetime
from django.contrib.auth.hashers import make_password

# Create your models here.
class User(models.Model):
    # IDs are registered automatically as a primary key
    username = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    introduction = models.CharField(max_length=500)
    created = models.DateTimeField(auto_now_add=True) 
    updated = models.DateTimeField(auto_now_add=False, blank=True, null=True )

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.pk:  # 新規作成の場合
            self.password = make_password(self.password)
        # Call parents class to use a parent method in the child class
        super(User, self).save(*args, **kwargs)