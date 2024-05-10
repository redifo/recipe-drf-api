from django.db import models
from django.contrib.auth.models import User
from reviews.models import Review
from likes.models import Like
from recipes.models import Recipe
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.


class Notification(models.Model):
    # Types of notifications
    FOLLOWED_POSTED = 'posted'
    REVIEWED = 'reviewed'
    COMMENT_LIKED = 'comment_liked'
    COMMENT_DISLIKED = 'comment_disliked'
    FOLLOWED_LIKED = 'followed_liked'
    NOTIFICATION_TYPES = [
        (FOLLOWED_POSTED, 'Posted'),
        (FOLLOWED_LIKED, 'Liked'),
        (REVIEWED, 'Reviewed'),
        (COMMENT_LIKED, 'Comment Liked'),
        (COMMENT_DISLIKED, 'Comment Disliked'),
    ]

    recipient = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='notifications')
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='sent_notifications')
    review = models.ForeignKey(
        Review, on_delete=models.SET_NULL, null=True, blank=True)
    user_followed = models.ForeignKey(
        User, on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='follow_notifications')
    recipe = models.ForeignKey(
        Recipe, on_delete=models.SET_NULL, null=True, blank=True)
    notification_type = models.CharField(
        max_length=18, choices=NOTIFICATION_TYPES)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['recipient']),
            models.Index(fields=['is_read']),
            models.Index(fields=['notification_type', 'is_read']),
        ]

    def __str__(self):
        return f"{self.sender.username} {self.notification_type} notification to {self.recipient.username}"


# https://stackoverflow.com/questions/64069110/django-signals-for-comment-notification
@receiver(post_save, sender=Review)
def create_review_notification(sender, instance, created, **kwargs):
    if created and instance.user != instance.recipe.user:
        Notification.objects.create(
            notification_type=Notification.REVIEWED,
            recipient=instance.recipe.user,
            recipe=instance.recipe,
            review=instance,
            sender=instance.user
        )
