from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from utils.base_authentication import JWTAuthentication
from user_auth.user_controller import *


register_controller = RegisterController()
login_controller = LoginController()
logout_controller = LogoutController()
forget_password_controller = ForgetPasswordController()
verify_otp_controller = VerifyOtpController()
change_password_controller = ChangePasswordController()
# user_details_controller = UserDetailsController()



class RegisterAPIView(ModelViewSet):
    def create(self, request):
        return register_controller.create(request)


class LoginAPIView(ModelViewSet):
    def login(self,request):
        return login_controller.login(request)
    
class LogoutAPIView(ModelViewSet):
    authentication_classes = (JWTAuthentication,)
    
    def logout(self,request):
        return logout_controller.logout(request)
    
class ChangePasswordAPIView(ModelViewSet):
    
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def post(self,request):
        return change_password_controller.change_password(request)


class VerifyOtpAPIView(ModelViewSet):
    def post(self,request):
        return verify_otp_controller.verify_otp(request)

class ForgetPasswordAPIView(ModelViewSet):
    def post(self,request):
        return forget_password_controller.forget_password(request)
    
# class UserDetailsViews(ModelViewSet):

#     def get(self, request):
#         return user_details_controller.get(request)


# views.py
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.authentication import TokenAuthentication
# from .user_serializer import UserDetailsSerializers

# class UserDetailsView(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user
#         serializer = UserDetailsSerializers(user)
#         return Response({"data": serializer.data}, status=200)


# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .user_serializer import UserDetailsSerializer  # Ensure the import path is correct

class UserDetailsView(APIView):
    # authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserDetailsSerializer(user)
        return Response({"data": serializer.data}, status=200)

