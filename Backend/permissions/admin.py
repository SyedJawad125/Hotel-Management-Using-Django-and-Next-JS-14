from django.contrib import admin
from .models import Role, Permission

# Custom admin for Role
class RoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'description')
    search_fields = ('name', 'code')
    filter_horizontal = ('permissions',)  # To display many-to-many fields

# Custom admin for Permission
class PermissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'module_name', 'description')
    search_fields = ('name', 'code')

# Register models in admin
admin.site.register(Role, RoleAdmin)
admin.site.register(Permission, PermissionAdmin)
