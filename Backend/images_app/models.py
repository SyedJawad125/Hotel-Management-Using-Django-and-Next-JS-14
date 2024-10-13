from django.db import models
from user_auth.models import User


class Images(models.Model):
    

    image = models.ImageField(upload_to='hotel_images/')
    name = models.CharField(max_length=30, null=True, blank=True)
    category = models.CharField(max_length=30)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Animated_images_home_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Animated_images_home_updated_by', null=True, blank=True)
    