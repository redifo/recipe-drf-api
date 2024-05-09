from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    bio = models.TextField(max_length=800, blank=True)
    name = models.CharField(max_length=50, blank=True)
    email = models.EmailField(max_length=100, blank=True, default=None)
    image = models.ImageField(default='../profile-default_f2ltpq', upload_to='profile_pics')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user}'s Profile"


def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

post_save.connect(create_profile, sender=User)