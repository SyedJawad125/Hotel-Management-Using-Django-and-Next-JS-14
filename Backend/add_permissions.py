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

    Permission(name='Create Room', code='create_room', module_name='Room', description='User can create Room'),
    Permission(name='Read Room', code='read_room', module_name='Room', description='User can read Room'),
    Permission(name='Update Room', code='update_room', module_name='Room', description='User can update Room'),
    Permission(name='Delete Room', code='delete_room', module_name='Room', description='User can delete Room'),
   
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