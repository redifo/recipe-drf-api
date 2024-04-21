from django.db import models
from django.contrib.auth.models import User


class Follow(models.Model):
    """
    Follow model, related to 'user' and 'followed'.
    'user' is a User that is following a User.
    'followed' is a User that is followed by 'user'.
   
    'unique_together' makes sure a user can't 'double follow' the same user.
    """
    follower = models.ForeignKey(
        User, related_name='follower', on_delete=models.CASCADE
    )
    followed = models.ForeignKey(
        User, related_name='followed', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    notify_on_new_post = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['follower', 'followed']

    def __str__(self):
        return f'{self.follower} follows {self.followed}'