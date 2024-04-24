from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers
from .models import Review

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
            'recipe', 'created_at', 'updated_at', 'text', 'image' 
        ]

class ReviewDetailSerializer(ReviewSerializer):
    """
    Serializer for the Review model used in Detail view
    """
    recipe = serializers.ReadOnlyField(source='recipe.id')