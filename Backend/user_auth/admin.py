from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Role

# Custom admin for the User model
class CustomUserAdmin(UserAdmin):
    # Define fields to display in the admin list view
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_active', 'is_locked', 'role')
    # Add filters and search functionality
    list_filter = ('is_active', 'is_locked', 'role')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    
    # To manage the form layout in the admin (add custom fields)
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'phone')}),
        ('Permissions', {'fields': ('is_active', 'is_locked', 'role')}),
        ('Important dates', {'fields': ('last_login', 'otp_generated_at', 'last_failed_time')}),
        ('Security', {'fields': ('failed_login_attempts', 'otp')}),
        ('Token info', {'fields': ('current_token',)})
    )

# Register the User model with the custom admin
admin.site.register(User, CustomUserAdmin)
