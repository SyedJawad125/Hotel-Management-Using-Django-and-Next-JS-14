from django.urls import path
from .views import EmployeeViews, RoomViews


urlpatterns = [

path('employee', EmployeeViews.as_view({"get": "get_employee",
                                                "post": "post_employee",
                                                "patch": "update_employee",
                                                "delete": "delete_employee"})),

path('room', RoomViews.as_view({"get": "get_room",
                                                "post": "post_room",
                                                "patch": "update_room",
                                                "delete": "delete_room"})),
]
