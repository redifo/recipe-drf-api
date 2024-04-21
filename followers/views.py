from rest_framework import generics, permissions, status
from .models import Follow
from .serializers import FollowSerializer
from drf_api.permissions import IsOwnerOrReadOnlyFollow
from rest_framework.response import Response

class FollowListView(generics.ListCreateAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(follower=self.request.user)

class FollowDetailView(generics.RetrieveDestroyAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [IsOwnerOrReadOnlyFollow]

    def put(self, request, pk):
        follow = self.get_object()
        serializer = self.get_serializer(follow, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)