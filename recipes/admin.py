from django.contrib import admin
from .models import Recipe, Ingredient, Comment, Rating, Tag

admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(Comment)
admin.site.register(Rating)
admin.site.register(Tag)