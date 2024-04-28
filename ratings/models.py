from django.db import models
from recipes.models import Recipe 
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

class Rating(models.Model): 
    user = models.ForeignKey(User, related_name='ratings', on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, related_name='ratings', on_delete=models.CASCADE)
    score = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['-created_at']
        unique_together = ['user', 'recipe']

    def __str__(self):
        return f"Rating {self.score}/5 by {self.user.username} for {self.recipe.title}"