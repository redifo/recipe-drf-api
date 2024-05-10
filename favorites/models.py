from django.db import models
from django.contrib.auth.models import User
from recipes.models import Recipe


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, related_name='favorites')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'recipe')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} favorited {self.recipe.title}"
