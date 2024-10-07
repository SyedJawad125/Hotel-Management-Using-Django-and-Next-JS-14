from django.apps import AppConfig

class HotelAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'hotel_app'

    def ready(self):
        import hotel_app.signals  # Import signals.py when the app is ready