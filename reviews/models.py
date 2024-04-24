from django.db import models
from recipes.models import Recipe 
from django.contrib.auth.models import User

class Review(models.Model):
    user = models.ForeignKey(User, related_name='reviews', on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, related_name='reviews', on_delete=models.CASCADE)
    text = models.TextField()
    image = models.ImageField(upload_to='review_pics', blank=True, null=True, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['-created_at']
    def __str__(self):
        return f"review by {self.user.username} on {self.recipe.title}"
