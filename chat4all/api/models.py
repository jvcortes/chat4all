import uuid
from django.db import models
from django.utils import timezone
from django.contrib.auth.base_user import AbstractBaseUser


class User(AbstractBaseUser):
    """
    Defines an User

    Class attributes:
        id (models.UUIDField): UUID (v4) used to indentify the user
        first_name (models.CharField): User first name
        first_name (models.CharField): User last name
        gender (models.CharField): User gender
        email (models.EmailField): User email. This field will be used for
        profile_picture (models.CharField): Path to the user profile picture
            accessing the application.
        created_at (models.DateTimeField): Creation date
        updated_at (models.DateTimeField): Update date
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)
    gender = models.CharField(max_length=256)
    email = models.EmailField()
    profile_picture = models.CharField(max_length=256)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'


class Contact(models.Model):
    """
    Defines a user contact

    Class attributes:
        user (models.ForeignKey): User id
        contact_id (models.ForeignKey) Contact id
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name='user_contacts')
    contact = models.ForeignKey(User, on_delete=models.CASCADE,
                                related_name='contacts_user')
