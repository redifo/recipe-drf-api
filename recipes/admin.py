from django.contrib import admin
from .models import Recipe, Comment, Rating, Tag

admin.site.register(Recipe)
admin.site.register(Comment)
admin.site.register(Rating)
admin.site.register(Tag)
