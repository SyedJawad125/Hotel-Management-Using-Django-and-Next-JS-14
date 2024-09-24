from django.contrib import admin

# Register your models here.


# models
# from django.db import models



# class User(AbstractUser):
#     username            = models.CharField(max_length=100, unique=True)
#     full_name           = models.CharField(max_length=200)
#     email               = models.EmailField(max_length=100, blank=True, null=True)
#     cnic                = models.CharField(max_length=13, blank=True, null=True)
#     mobile              = models.CharField(max_length=20, unique=True, blank=True, null=True)
#     profile_image       = models.ImageField(max_length=255, upload_to=get_profile_image_path, null=True, blank=True, default=get_default_profile_image_path)
#     role                = models.ForeignKey('Role', related_name='users', blank=True, null=True, on_delete=models.CASCADE)
#     login_attempts      = models.IntegerField(default=0)
#     is_blocked          = models.BooleanField(default=False)
#     created_at          = models.DateTimeField(auto_now_add=True)
#     created_by          = models.ForeignKey('User', related_name='+', blank=True, null=True, on_delete=models.CASCADE)
#     updated_at          = models.DateTimeField(auto_now=True)
#     updated_by          = models.ForeignKey('User', related_name='+', blank=True, null=True, on_delete=models.CASCADE)
#     is_staff            = models.BooleanField(default=False)
#     is_superuser        = models.BooleanField(default=False)
#     current_token       = models.CharField(max_length=500, blank=True, null=True)



# class Guest(models.Model):
#     user = models.ForeignKey('user', related_name='annny', on_delete=models.CASCADE)
#     passport = models.CharField(max_length=200)
#     # any new fields




# controller


# from django.db import transaction


# class GuestController:

#     def create_guest(self,request):
#         try:
#             #user ki dictionery request.data se bahir nikal len ge
#             user = request.data.pop("user") if "user" in request.data else None

#             if user:
#                 # aur phr user bnayen ge
#                 serialized_user = UserSerializer(data=request.data)

#                 if serialized_user.is_valid():
#                     with transaction.atomic():
#                         #agr user ban jaye
#                         user_response = serialized_user.save()

#                         # toh user ki id Guest mein de den ge
#                         request.data['user'] = user_response.id
                        
#                         serialized_guest = GuestSerializer(data=request.data)

#                         if serialized_guest.is_valid()
#                             guest_response = serialized_guest.save()

#                             # yahan success ka response send kr dein#
#                         else:
#                             transaction.set_rollback(True)
#                             # yahan serialized_guest ka error throw kr dein#
#                             # return create_response({'msg': get_first_error_message_from_serializer(serialized_guest.errors)}, status=status.HTTP_400_BAD_REQUEST)

#                 else:
#                     # yahan serialized_user ka error throw kr dein#
#                     # return create_response({'msg': get_first_error_message_from_serializer(serialized_user.errors)}, status=status.HTTP_400_BAD_REQUEST)


#         except Exception as e:
#             print(str(e))