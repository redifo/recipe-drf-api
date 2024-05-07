from django.db.models import Count
from rest_framework import generics, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import Profile
from followers.models import Follow
from .serializers import ProfileSerializer
from drf_api.permissions import IsOwnerOrReadOnly

class ProfileList(generics.ListAPIView):
    """
    List all profiles, with counts for posts, followers, and following.
    """
    queryset = Profile.objects.annotate(
        recipes_count=Count('user__recipes', distinct=True), 
        followers_count=Count('user__followers', distinct=True),  
        following_count=Count('user__following', distinct=True)  
    ).order_by('-created_at')
    serializer_class = ProfileSerializer
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_fields = [
        'user__followers__follower',  
        'user__following__followed', 
                        ]
    ordering_fields = ['created_at', 'recipes_count', 'followers_count', 'following_count']

class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update a profile if you're the owner, including count details.
    """
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.annotate(
        recipes_count=Count('user__recipes', distinct=True),
        followers_count=Count('user__followers', distinct=True), 
        following_count=Count('user__following', distinct=True)  
    ).order_by('-created_at')
    serializer_class = ProfileSerializer

class FollowedProfilesList(generics.ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Get profile IDs from Follow model where current user is the follower
        followed_ids = Follow.objects.filter(follower=user).values_list('followed__id', flat=True)
        return Profile.objects.filter(id__in=followed_ids).annotate(
            recipes_count=Count('user__recipes', distinct=True),
            followers_count=Count('user__followers', distinct=True),
            following_count=Count('user__following', distinct=True)
        )
