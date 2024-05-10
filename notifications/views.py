from rest_framework import generics, permissions, filters
from .models import Notification
from .serializers import NotificationSerializer
from django_filters.rest_framework import DjangoFilterBackend
from drf_api.permissions import IsRecipient


class NotificationsList(generics.ListCreateAPIView):

    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        'recipient',
        'sender',
    ]

    def get_queryset(self):
        """
        This view only returns a list of notifications
        for the currently authenticated user. so other
        users cant see the notifications of other users
        """
        user = self.request.user
        return Notification.objects.filter(
            recipient=user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)


class NotificationsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all().order_by('-created_at')
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated, IsRecipient]

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
