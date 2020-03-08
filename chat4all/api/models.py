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
        last_name (models.CharField): User last name
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
    email = models.EmailField(unique=True)
    profile_picture = models.CharField(max_length=256, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'


class Contact(models.Model):
    """
    Defines a contact

    Class attributes:
        user (models.ForeignKey): related user id
        contact_id (models.ForeignKey) Contact id
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name='related_user')
    contact = models.ForeignKey(User, on_delete=models.CASCADE,
                                related_name='contacts')

    class Meta:
        unique_together = ('user', 'contact')
