# Generated by Django 3.2.25 on 2024-04-19 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipeingredientquantity',
            name='ingredient',
        ),
        migrations.RemoveField(
            model_name='recipeingredientquantity',
            name='recipe',
        ),
        migrations.RemoveField(
            model_name='recipe',
            name='ingredients',
        ),
        migrations.AddField(
            model_name='recipe',
            name='ingredients',
            field=models.TextField(default='EGG'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Ingredient',
        ),
        migrations.DeleteModel(
            name='RecipeIngredientQuantity',
        ),
    ]