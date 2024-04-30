from rest_framework import serializers
from django.db import IntegrityError
from .models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
    """
    Serializer for the favorite model
    The create method handles the unique constraint on 'user' and 'recipe'
    """
    user = serializers.ReadOnlyField(source='user.username')
    recipe_title = serializers.ReadOnlyField(source='recipe.title')

    class Meta:
        model = Favorite
        fields = ['id', 'user', 'recipe', 'recipe_title', 'created_at']

    def create(self, validated_data):
            try:
                return super().create(validated_data)
            except IntegrityError:
                raise serializers.ValidationError({
                    'detail': 'possible duplicate'
                })