from rest_framework import serializers
from users.models import User
from common.mixins.trim_string_fields_mixin import TrimStringFieldsMixin


class FetchEventUserSerializer(TrimStringFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'profile_picture']
