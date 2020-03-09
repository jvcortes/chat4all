import json
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from api import models
from api import serializers


class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

    @action(methods=['get'],
            detail=True,
            url_path='contacts',
            url_name='list-contacts')
    def list_contacts(self, request, pk=None):
        queryset = models.User.objects.get(pk=pk).get_contacts()
        serializer = serializers.UserSerializer(queryset,
                                                context={'request':
                                                         request},
                                                many=True)
        return Response(serializer.data)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = models.Contact.objects.all()
    serializer_class = serializers.ContactSerializer
