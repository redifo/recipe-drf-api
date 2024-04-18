from rest_framework import serializers
from .models import Recipe, Ingredient, Tag, Rating, RecipeIngredientQuantity


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name', 'description']

class RecipeIngredientQuantitySerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(read_only=True)
    class Meta:
        model = RecipeIngredientQuantity
        fields = ['ingredient', 'quantity']
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']

class RecipeSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    is_owner = serializers.SerializerMethodField()
    ingredients = RecipeIngredientQuantitySerializer(source='recipeingredientquantity_set', many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.user

    class Meta:
        model = Recipe
        fields = [
            'id',
            'title',
            'description',
            'preparation_time',
            'cooking_time',
            'servings',
            'instructions',
            'created_at',
            'updated_at',
            'image',
            'user',
            'is_owner',
            'ingredients', 
            'tags',
        ]
