from django.urls import path
from .views import ChatbotAPIView

urlpatterns = [
    path('api/chat/', ChatbotAPIView.as_view(), name='chatbot_api'),
]
