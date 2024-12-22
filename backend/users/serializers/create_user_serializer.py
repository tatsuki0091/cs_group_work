from rest_framework import serializers
from users.models import User
from common.mixins.trim_string_fields_mixin import TrimStringFieldsMixin


class CreateUserSerializer(TrimStringFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
