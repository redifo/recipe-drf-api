from rest_framework import generics, permissions
from .models import Notification
from .serializers import NotificationSerializer

class NotificationsList(generics.ListCreateAPIView):
    queryset = Notification.objects.all().order_by('-created_at')
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
