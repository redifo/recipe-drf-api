from django.db import IntegrityError
from rest_framework import serializers
from .models import Follow


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ['id', 'follower', 'followed', 'notify_on_new_post']
        read_only_fields = ['follower']

    def validate(self, value):
        if self.context['request'].user == value:
            raise serializers.ValidationError("You cannot follow yourself.")
        return value

    def create(self, validated_data):
        validated_data['follower'] = self.context['request'].user
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError(
                {'detail': 'This follow relationship already exists.'})

    def update(self, instance, validated_data):

        instance.notify_on_new_post = validated_data.get(
            'notify_on_new_post', instance.notify_on_new_post)
# The 'followed' field is not updated, even if its passed in the validated_data
        instance.save()
        return instance
