from django.contrib import admin
from .models import Recipe, Rating, Tag

admin.site.register(Recipe)
admin.site.register(Rating)
admin.site.register(Tag)
