from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    is_owner = serializers.SerializerMethodField()

    def validate_image(self, value):
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
    class Meta:
        model = Profile
        fields = [
            'id',
            'user',
            'bio',
            'name',
            'image',
            'created_at',
            'updated_at',
            'email',
            'is_owner',
        ]


