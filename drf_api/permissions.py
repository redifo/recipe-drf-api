from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        try:
            owner = obj.user
        except AttributeError:
            owner = obj.follower
        return owner == request.user

class IsSuperUser(permissions.BasePermission):
    """
    Allows access only to superusers.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser
    
class IsRecipient(permissions.BasePermission):
    """
    Custom permission to only allow recipients of an object to edit or delete it.
    """

    def has_object_permission(self, request, view, obj):
        # Permissions are only allowed to the recipient of the notification.
        return obj.recipient == request.user