from rest_framework import serializers
from .models import Recipe, Tag
from ratings.models import Rating
from favorites.models import Favorite


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class RecipeSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    is_owner = serializers.SerializerMethodField()
    tags = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Tag.objects.all(), required=False)
    profile_id = serializers.ReadOnlyField(source='user.profile.id')
    profile_image = serializers.ReadOnlyField(source='user.profile.image.url')
    rating_id = serializers.SerializerMethodField()
    ratings_average = serializers.ReadOnlyField()
    ratings_count = serializers.ReadOnlyField()
    reviews_count = serializers.ReadOnlyField()
    favorites_count = serializers.IntegerField(read_only=True, default=0)
    is_favorited = serializers.SerializerMethodField()
    favorite_id = serializers.SerializerMethodField()
    initial_rating = serializers.SerializerMethodField(read_only=True)

    def validate_image(self, value):
        if value is not None:
            if value.size > 1024 * 1024 * 2:
                raise serializers.ValidationError(
                    'Image size larger than 2MB!'
                )
            if value.image.width > 4096:
                raise serializers.ValidationError(
                    'Image width larger than 4096px!'
                )
            if value.image.height > 4096:
                raise serializers.ValidationError(
                    'Image height larger than 4096px!'
                )
        return value

    def get_initial_rating(self, obj):
        """
        Retrieve the initial rating value and ID
        for the current user if it exists.
        """
        request = self.context.get('request')
        user = self.context['request'].user
        if user.is_authenticated:
            if request and hasattr(request, 'user'):
                rating = Rating.objects.filter(
                    user=request.user, recipe=obj).first()
                if rating:
                    return {'score': rating.score, 'id': rating.id}
            return None

    def get_is_favorited(self, obj):
        """Check if a recipe is favorited by the current user."""
        user = self.context['request'].user
        if user.is_authenticated:
            return Favorite.objects.filter(user=user, recipe=obj).exists()
        return False

    def get_favorite_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            favorite = obj.favorites.filter(user=user).first()
            return favorite.id if favorite else None

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.user

    def get_rating_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            rating = Rating.objects.filter(
                user=user, recipe=obj
            ).first()
            return rating.id if rating else None
        return None

    class Meta:
        model = Recipe
        fields = [
            'id',
            'title',
            'description',
            'ingredients',
            'preparation_time',
            'cooking_time',
            'servings',
            'instructions',
            'created_at',
            'updated_at',
            'image',
            'user',
            'is_owner',
            'tags',
            'profile_id',
            'profile_image',
            'rating_id',
            'ratings_count',
            'reviews_count',
            'ratings_average',
            'favorites_count',
            'is_favorited',
            'favorite_id',
            'initial_rating'
        ]
