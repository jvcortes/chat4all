from api import models
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.User
        fields = ['id',
                  'first_name',
                  'last_name',
                  'gender',
                  'email',
                  'profile_picture',
                  'created_at',
                  'updated_at']


class ContactSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Contact
        fields = ['user', 'associate']
