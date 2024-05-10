from rest_framework import serializers
from .models import Profile
from followers.models import Follow


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    is_owner = serializers.SerializerMethodField()
    following_id = serializers.SerializerMethodField()
    recipes_count = serializers.IntegerField(read_only=True)
    followers_count = serializers.IntegerField(read_only=True)
    following_count = serializers.IntegerField(read_only=True)

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

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.user

    def get_following_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            following = Follow.objects.filter(
                follower=user, followed=obj.user
            ).first()

            return following.id if following else None
        return None

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
            'following_id',
            'recipes_count',
            'followers_count',
            'following_count',
        ]
