import threading
from django.core.mail import send_mail
from django.utils import timezone
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

from my_project.settings import EMAIL_HOST_USER
from user_auth.user_filter import UserDetailsFilter
from user_auth.user_serializer import *
from user_auth.models import Token, User
from utils.reusable_methods import get_first_error_message, generate_six_length_random_number
from utils.response_messages import *
from utils.helper import create_response, paginate_data
from permissions.models import Role, Permission
from rest_framework import status


class ChangePasswordController:
    serializer_class = ChangePasswordSerializer
    def change_password(self,request):
        try:
            user = request.user
            if not user:
                return create_response({},USER_NOT_FOUND, status_code=400)

            serialized_data = self.serializer_class(data=request.data, context={'user':user})

            if serialized_data.is_valid():
                user.set_password(request.data['new_password'])
                user.save()
                return create_response({},PASSWORD_UPDATED, status_code=200)
            else:
                return create_response({},get_first_error_message(serialized_data.errors, UNSUCCESSFUL), status_code=400)
        except Exception as e:
            return create_response({'error':str(e)}, UNSUCCESSFUL, 500)

class VerifyOtpController:
    serializer_class = VerifyOtpSerializer
    
    def verify_otp(self,request):
        # check OTP time delay
        time_delay = timezone.now() - timezone.timedelta(seconds=300)
        user = User.objects.filter(otp=request.data.get("otp"), otp_generated_at__gt=time_delay).first()

        if not user:
            return create_response({},INVALID_OTP, status_code=400)

        serialized_data = self.serializer_class(data=request.data, context={'user':user})

        if serialized_data.is_valid():
            user.set_password(request.data['new_password'])
            user.otp = None
            user.save()
            return create_response({},SUCCESSFUL, status_code=200)
        else:
            return create_response({},get_first_error_message(serialized_data.errors,UNSUCCESSFUL), status_code=400)

        
class ForgetPasswordController:
    serializer_class = ForgetPasswordSerializer
    
    def forget_password(self,request):
        serialized_data = self.serializer_class(data=request.data)
        if not serialized_data.is_valid():
            return create_response({},get_first_error_message(serialized_data.errors, UNSUCCESSFUL), status_code=400 )
        
        user = User.objects.filter(email=request.data['email']).first()
        if not user:
            return create_response({}, USER_NOT_FOUND, status_code=404)

        otp = generate_six_length_random_number()
        user.otp = otp
        user.otp_generated_at = timezone.now()
        user.save()
        subject = "Password Recovery Request"
        message = f"""
            Hi {user.get_full_name()},
            Your request for password recovery has been received.
            Please use the following otp.
            OTP: {otp}
            """
        recipient_list = [request.data.get("email")]
        t = threading.Thread(target=send_mail, args=(subject, message, EMAIL_HOST_USER, recipient_list))
        t.start()
        return create_response({}, EMAIL_SUCCESSFULLY_SENT, status_code=200)


from .models import Role  # Import the Role model

class RegisterController:
    serializer_class = UserSerializer

    def create(self, request):
        try:
            serialized_data = self.serializer_class(data=request.data)
            if serialized_data.is_valid():
                instance = serialized_data.save()
                response_data = self.serializer_class(instance).data
                return Response(response_data, status=status.HTTP_201_CREATED)
            else:
                return Response(
                    {'error': get_first_error_message(serialized_data.errors, UNSUCCESSFUL)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    


from rest_framework import status
from rest_framework.response import Response
from django.utils import timezone
from django.contrib.auth import authenticate

class LoginController:
    serializer_class = LoginSerializer

    def login(self, request):
        try:
            # Validate the input data
            serialized_data = self.serializer_class(data=request.data)
            if not serialized_data.is_valid():
                return Response({
                    "message": "Unsuccessful",
                    "errors": serialized_data.errors
                }, status=status.HTTP_400_BAD_REQUEST)

            # Authenticate the user
            user = authenticate(username=request.data['username'], password=request.data['password'])
            if not user:
                return Response({
                    "message": "Incorrect email or password"
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Check if the user is active
            if not user.is_active:
                return Response({
                    "message": "Account is disabled"
                }, status=status.HTTP_403_FORBIDDEN)

            # Initialize the permissions dictionary dynamically
            permissions_dict = {perm.code: False for perm in Permission.objects.all()}

            # Check if the user is a superuser or has a role with permissions
            if user.is_superuser:
                for perm in Permission.objects.all():
                    permissions_dict[perm.code] = True
            elif user.role:
                for perm in user.role.permissions.all():
                    permissions_dict[perm.code] = True

            # Prepare the response data
            response_data = {
                "token": user.get_access_token(),
                "name": user.get_full_name(),
                "username": user.username,
                "email": user.email,
                "role_id": user.role.id if user.role else None,
                "role_name": user.role.name if user.role else None,
                "permissions": permissions_dict
            }

            # Update or create the user's token
            Token.objects.update_or_create(defaults={"token": response_data.get("token")}, user_id=user.guid)
            
            # Reset failed login attempts and update last login time
            user.failed_login_attempts = 0
            user.last_failed_time = None
            user.last_login = timezone.now()
            user.save()

            # Return the response without setting session or CSRF cookies
            return Response({
                "message": "Successful",
                "data": response_data
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({
                "message": "Unsuccessful",
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class LogoutController:
    def logout(self,request):
        try:
            user = request.user.guid
            token = Token.objects.filter(user=user)
            if not token:
                return create_response({},UNSUCCESSFUL, status_code=400)
            token.delete()
            return create_response({}, SUCCESSFUL, status_code=200)
        except Exception as e:
            return create_response({'error':str(e)}, UNSUCCESSFUL, 500)
        
class UserDetailsController:
    serializer_class = UserDetailsSerializer
    filterset_class = UserDetailsFilter



    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_user_detail(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)


        except Exception as e:
            return Response({'error': str(e)}, 500)

# class RegisterController:
#     serializer_class = UserSerializer
#     def create(self,request):
#         try:
#             serialized_data = self.serializer_class(data=request.data)
#             if serialized_data.is_valid():
#                 instance = serialized_data.save()
#                 return create_response(self.serializer_class(instance).data, SUCCESSFUL, status_code=200)
#             else:
#                 return create_response({}, get_first_error_message(serialized_data.errors, UNSUCCESSFUL), status_code=400)
#         except Exception as e:
#             return create_response({'error':str(e)}, UNSUCCESSFUL, 500)

# class LoginController:   (Last Wala)
#     serializer_class = LoginSerializer

#     def login(self, request):
#         try:
#             # Validate the input data
#             serialized_data = self.serializer_class(data=request.data)
#             if not serialized_data.is_valid():
#                 return create_response({}, get_first_error_message(serialized_data.errors, "Unsuccessful"), 400)

#             # Authenticate the user
#             user = authenticate(username=request.data['username'], password=request.data['password'])
#             if not user:
#                 return create_response({}, message="Incorrect email or password", status_code=400)

#             # Initialize the permissions dictionary
#             permissions_dict = {
#                 "create_employee": False,
#                 "read_employee": False,
#                 "update_employee": False,
#                 "delete_employee": False
#             }

#             # Check if the user is a superuser
#             if user.is_superuser:
#                 # Fetch all permissions and set them to True
#                 all_permissions = Permission.objects.all()
#                 for perm in all_permissions:
#                     if perm.code in permissions_dict:
#                         permissions_dict[perm.code] = True
#             elif user.role:
#                 # Fetch permissions based on the user's role
#                 role_permissions = user.role.permissions.all()
#                 for perm in role_permissions:
#                     if perm.code in permissions_dict:
#                         permissions_dict[perm.code] = True

#             # Prepare the response data
#             response_data = {
#                 "token": user.get_access_token(),
#                 "name": user.get_full_name(),
#                 "username": user.username,
#                 "email": user.email,
#                 "permissions": permissions_dict
#             }

#             # Update or create the user's token
#             Token.objects.update_or_create(defaults={"token": response_data.get("token")}, user_id=user.guid)
            
#             # Reset failed login attempts and update last login time
#             user.failed_login_attempts = 0
#             user.last_failed_time = None
#             user.last_login = timezone.now()
#             user.save()

#             # Return response data including permissions
#             return create_response(response_data, "Successful", status_code=200)
        
#         except Exception as e:
#             return create_response({'error': str(e)}, "Unsuccessful", 500)


# For Sessions
# from rest_framework.authtoken.models import Token
# from django.middleware import csrf
# from django.conf import settings
# from django.utils.http import http_date
# from datetime import datetime, timedelta
# from django.utils import timezone
# from django.contrib.auth import authenticate
# from django.contrib.auth.models import Permission
# from rest_framework.response import Response
# from rest_framework import status

# class LoginController:
#     serializer_class = LoginSerializer

#     def login(self, request):
#         try:
#             # Validate the input data
#             serialized_data = self.serializer_class(data=request.data)
#             if not serialized_data.is_valid():
#                 return Response({
#                     "message": "Unsuccessful",
#                     "errors": serialized_data.errors
#                 }, status=status.HTTP_400_BAD_REQUEST)

#             # Authenticate the user
#             user = authenticate(username=request.data['username'], password=request.data['password'])
#             if not user:
#                 return Response({
#                     "message": "Incorrect email or password"
#                 }, status=status.HTTP_400_BAD_REQUEST)

#             # Check if the user is active
#             if not user.is_active:
#                 return Response({
#                     "message": "Account is disabled"
#                 }, status=status.HTTP_403_FORBIDDEN)

#             # Check or create the user's auth token
#             token, created = Token.objects.get_or_create(user=user)

#             # Initialize permissions dynamically
#             permissions_dict = {perm.codename: False for perm in Permission.objects.all()}
#             if user.is_superuser:
#                 for perm in permissions_dict:
#                     permissions_dict[perm] = True
#             elif user.groups.exists():
#                 for perm in user.user_permissions.all():
#                     permissions_dict[perm.codename] = True

#             response_data = {
#                 "token": token.key,
#                 "name": user.get_full_name(),
#                 "username": user.username,
#                 "email": user.email,
#                 "permissions": permissions_dict
#             }

#             # Update token and reset login attempts
#             user.failed_login_attempts = 0
#             user.last_failed_time = None
#             user.last_login = timezone.now()
#             user.save()

#             # Prepare response and set session cookie
#             response = Response({
#                 "message": "Successful",
#                 "data": response_data
#             }, status=status.HTTP_200_OK)

#             expires = datetime.now() + timedelta(days=settings.SESSION_COOKIE_AGE // (24 * 3600))
#             response.set_cookie(
#                 key="sessionid",
#                 value=response_data["token"],
#                 httponly=True,
#                 secure=settings.SESSION_COOKIE_SECURE,
#                 expires=http_date(expires.timestamp()),
#                 samesite='Strict'
#             )

#             response["X-CSRFToken"] = csrf.get_token(request)
#             return response

#         except Exception as e:
#             return Response({
#                 "message": "Unsuccessful",
#                 "error": str(e)
#             }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
        

# For Sessions
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework import status
# from django.contrib.auth.models import User
# from rest_framework.permissions import IsAuthenticated

# class SessionCheckView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user
#         if user.is_authenticated:
#             return Response({
#                 "message": "Session is active",
#                 "username": user.username
#             }, status=status.HTTP_200_OK)
#         return Response({
#             "message": "Session has expired or is invalid"
#         }, status=status.HTTP_401_UNAUTHORIZED)

