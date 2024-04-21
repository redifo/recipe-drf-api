from django.db import IntegrityError
from rest_framework import serializers
from .models import Follow

class FollowSerializer(serializers.ModelSerializer):

    class Meta:
        model = Follow
        fields = ['id', 'created_at', 'follower', 'followed', 'notify_on_new_post']
        read_only_fields = ['follower', 'followed']

    def validate(self, data):
        if data['follower'] == data['followed']:
            raise serializers.ValidationError("You cannot follow yourself.")
        return data

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({'detail': 'This follow relationship already exists.'})