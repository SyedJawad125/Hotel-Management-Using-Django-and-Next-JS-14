import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'my_project.settings')
import django
django.setup()
from permissions.models import Permission

permissions = [
    Permission(name='Create Role', code='create_role', module_name='Role', description='User can create role'),
    Permission(name='Read Role', code='read_role', module_name='Role', description='User can read role'),
    Permission(name='Update Role', code='update_role', module_name='Role', description='User can update role'),
    Permission(name='Delete Role', code='delete_role', module_name='Role', description='User can delete role'),
   
]


def add_permission():
    for permission in permissions:
        try:
            Permission.objects.get(code=permission.code)
        except Permission.DoesNotExist:
            permission.save()


if __name__ == '__main__':
    print("Populating hrm...")
    add_permission()