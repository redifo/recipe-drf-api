from django.db import models
from django.contrib.auth.models import User

class Recipe(models.Model):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(User, related_name='recipes', on_delete=models.CASCADE)
    description = models.TextField()
    preparation_time = models.PositiveIntegerField(help_text="Enter time in minutes")
    cooking_time = models.PositiveIntegerField(help_text="Enter time in minutes")
    servings = models.PositiveIntegerField()
    instructions = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='recipe_images', default='../recipe-default_ye1fru')
    ingredients = models.TextField() 
    tags = models.ManyToManyField('Tag', related_name='recipes', blank=True)
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} by {self.user.username}"
    
class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    

