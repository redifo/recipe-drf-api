from rest_framework import serializers
from django.db import IntegrityError
from .models import Like

class LikeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Like model
    The create method handles the unique constraint on 'user' and 'review'
    """
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Like
        fields = ['id', 'user', 'review', 'is_like', 'created_at']

    def update(self, instance, validated_data):
        instance.is_like = validated_data.get('is_like', instance.is_like)
        instance.save()
        return instance
    
    def create(self, validated_data):
            try:
                return super().create(validated_data)
            except IntegrityError:
                raise serializers.ValidationError({
                    'detail': 'possible duplicate'
                })