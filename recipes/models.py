from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.core.validators import MaxValueValidator, MinValueValidator


class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

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
    """ https://docs.djangoproject.com/en/3.2/ref/models/fields/#django.db.models.ManyToManyField 
    and https://docs.djangoproject.com/en/3.2/topics/db/models/#intermediary-manytomany """
    ingredients = models.ManyToManyField(Ingredient, through='RecipeIngredientQuantity', related_name='recipes')
    tags = models.ManyToManyField('Tag', related_name='recipes')
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} by {self.user.username}"
    
class RecipeIngredientQuantity(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.quantity} of {self.ingredient.name} for {self.recipe.title}"

class Comment(models.Model):
    user = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, related_name='comments', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.recipe.title}"

class Rating(models.Model):
    user = models.ForeignKey(User, related_name='ratings', on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, related_name='ratings', on_delete=models.CASCADE)
    score = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])

    def __str__(self):
        return f"Rating {self.score}/10 by {self.user.username} for {self.recipe.title}"

class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
def create_user_recipe(sender, instance, created, **kwargs):
    if created:
        Recipe.objects.create(user=instance, title="Default Recipe")

post_save.connect(create_user_recipe, sender=User)
