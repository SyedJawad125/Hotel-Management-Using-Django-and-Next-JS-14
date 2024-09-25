from django.urls import path
from .views import EmployeeViews, GuestViews, RoomViews


urlpatterns = [

path('employee', EmployeeViews.as_view({"get": "get_employee",
                                                "post": "post_employee",
                                                "patch": "update_employee",
                                                "delete": "delete_employee"})),
                                                
path('guest/<int:id>', GuestViews.as_view({
    "get": "get_guest",
    "post": "post_guest",
    "patch": "update_guest",
    "delete": "delete_guest"
})),

path('room', RoomViews.as_view({"get": "get_room",
                                                "post": "post_room",
                                                "patch": "update_room",
                                                "delete": "delete_room"})),
]
