from django.urls import path
from .views import ContactViews, EmployeeViews, GuestViews, RoomViews


urlpatterns = [

path('employee', EmployeeViews.as_view({"get": "get_employee",
                                                "post": "post_employee",
                                                "patch": "update_employee",
                                                "delete": "delete_employee"})),
                                                
path('guest', GuestViews.as_view({"get": "get_guest",
                                            "post": "post_guest",
                                            "patch": "update_guest",
                                            "delete": "delete_guest"})),

path('room', RoomViews.as_view({"get": "get_room",
                                                "post": "post_room",
                                                "patch": "update_room",
                                                "delete": "delete_room"})),

 path('contact', ContactViews.as_view({"get": "get_contact",
                                                "post": "post_contact",
                                                "patch": "update_contact",
                                                "delete": "delete_contact"})),
    
]
