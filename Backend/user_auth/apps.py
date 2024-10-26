from django.apps import AppConfig


class UserAuthConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user_auth'



# class YourAppConfig(AppConfig):
#     name = 'user_auth'

#     def ready(self):
#         import user_auth.signals
