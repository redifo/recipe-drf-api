from rest_framework import serializers
from .models import Recipe, Tag
from ratings.models import Rating
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']

class RecipeSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    is_owner = serializers.SerializerMethodField()
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all(), required=False)
    profile_id = serializers.ReadOnlyField(source='user.profile.id')
    profile_image = serializers.ReadOnlyField(source='user.profile.image.url')
    rating_id = serializers.SerializerMethodField()
    ratings_average = serializers.ReadOnlyField()
    reviews_count = serializers.ReadOnlyField()

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
            'reviews_count',
            'ratings_average'
        ]
