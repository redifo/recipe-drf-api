from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers
from .models import Review
from likes.models import Like

class ReviewSerializer(serializers.ModelSerializer):
    """
    Serializer for the Review model
    """
    user = serializers.ReadOnlyField(source='user.username') 
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='user.profile.id')
    profile_image = serializers.ReadOnlyField(source='user.profile.image.url')
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()
    likes_count = serializers.IntegerField(read_only=True)
    dislikes_count = serializers.IntegerField(read_only=True)
    like_id = serializers.SerializerMethodField()
    is_like = serializers.SerializerMethodField()

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
            
    def get_is_like(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(user=user, review=obj).first()
            return like.is_like if like else None
        return None

    def get_like_id(self, obj):
        request = self.context['request']
        user = request.user
        if user.is_authenticated:
            like = Like.objects.filter(user=user, review=obj).first()
            if like:
                return like.id
        return None

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.user 

    def get_created_at(self, obj):
        return naturaltime(obj.created_at)

    def get_updated_at(self, obj):
        return naturaltime(obj.updated_at)

    class Meta:
        model = Review
        fields = [
            'id', 'user', 'is_owner', 'profile_id', 'profile_image',
            'recipe', 'created_at', 'updated_at', 'text', 'image', 
            'likes_count', 'dislikes_count', 'like_id', 'is_like'
        ]

class ReviewDetailSerializer(ReviewSerializer):
    """
    Serializer for the Review model used in Detail view
    """
    recipe = serializers.ReadOnlyField(source='recipe.id')