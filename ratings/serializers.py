from django.db import IntegrityError
from rest_framework import serializers
from ratings.models import Rating


class RatingSerializer(serializers.ModelSerializer):
    """
    Serializer for the Rating model
    The create method handles the unique constraint on 'user' and 'recipe'
    """
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Rating
        fields = ['id', 'created_at', 'updated_at', 'user', 'recipe', 'score']
        read_only_fields = ['user']
        ordering = ['-created_at']

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'Duplicate rating not allowed'
            })

    def update(self, instance, validated_data):
        instance.score = validated_data.get('score', instance.score)
        instance.save()
        return instance
