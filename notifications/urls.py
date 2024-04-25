from django.urls import path
from .views import NotificationsList
urlpatterns = [
    path('notifications/', NotificationsList.as_view()),
    path('notifications/<int:pk>/', NotificationsList.as_view()),
]