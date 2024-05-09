from django.urls import path
from .views import NotificationsList, NotificationsDetail
urlpatterns = [
    path('notifications/', NotificationsList.as_view()),
    path('notifications/<int:pk>/', NotificationsDetail.as_view()),
]