from rest_framework import serializers
from .models import Notification
from followers.models import Follow
from recipes.models import Recipe


class NotificationSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(
        source='sender.username', read_only=True)
    recipient_name = serializers.CharField(
        source='recipient.username', read_only=True)
    notification_type_display = serializers.CharField(
        source='get_notification_type_display', read_only=True)
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:

        model = Notification
        fields = [
            'id', 'sender_name', 'recipient_name', 'notification_type_display',
            'review', 'user_followed', 'recipe', 'is_read', 'created_at',
            'notification_type', 'recipient', 'sender'
        ]
