from django.db import models
from django.contrib.auth.models import User
from reviews.models import Review

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='likes')
    is_like = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'review')  # Ensure one interaction per user per review
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.user.username} {'liked' if self.is_like else 'disliked'} review {self.review.id}"