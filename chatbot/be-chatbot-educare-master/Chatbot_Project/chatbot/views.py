from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .chatbot_model import chatbot_response
import logging

logger = logging.getLogger(__name__)

@method_decorator(csrf_exempt, name='dispatch')
class ChatbotAPIView(APIView):
    permission_classes = [AllowAny]  # Cho phép mọi người gửi yêu cầu mà không cần xác thực

    def post(self, request, format=None):
        data = request.data
        msg = data.get('text', '').strip()
        if not msg:
            return Response({"error": "No message provided."}, status=status.HTTP_400_BAD_REQUEST)

        logger.info(f"User input: {msg}")
        predicted_class, confidence, bot_response_text = chatbot_response(msg)
        logger.info(f"Bot response: {bot_response_text}")

        return Response({
            "predicted_class": predicted_class,
            "confidence": confidence,
            "response": bot_response_text
        }, status=status.HTTP_200_OK)
