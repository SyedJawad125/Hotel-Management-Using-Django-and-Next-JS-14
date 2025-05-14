from django.contrib.auth.backends import ModelBackend
from user_auth.models import User

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None




# from user_auth.models import User  # Adjust to your actual user model

# user = User.objects.get(email="alishah1250000@gmail.com")

# print("Is active:", user.is_active)
# print("Is locked:", user.is_locked)  # If you have this field
# print("Password check:", user.check_password("correct_password"))
