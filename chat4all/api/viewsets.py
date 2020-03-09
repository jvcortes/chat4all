import uuid
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
            url_path='contacts(?:/(?P<contact_id>[0-9a-f-]+))?',
            url_name='list-contacts')
    def list_contacts(self, request, pk=None, contact_id=None):
        user = models.User.objects.get(pk=pk)
        if contact_id:
            queryset = list(filter(lambda contact:
                                   contact.id == uuid.UUID(contact_id),
                                   user.get_contacts()))
        else:
            queryset = user.get_contacts()

        return Response(
            serializers.UserSerializer(queryset,
                                       context={'request': request},
                                       many=True).data)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = models.Contact.objects.all()
    serializer_class = serializers.ContactSerializer
