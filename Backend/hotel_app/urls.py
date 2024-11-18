from django.urls import path
from .views import ContactViews, EmployeeViews, GuestViews, PublicBookingViews, PublicRoomViews, RoomViews, BookingViews, PaymentViews


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

path('publicroom', PublicRoomViews.as_view({"get": "get_publicroom"})),

path('booking', BookingViews.as_view({"get": "get_booking",
                                                "post": "post_booking",
                                                "patch": "update_booking",
                                                "delete": "delete_booking"})),

path('publicbooking', PublicBookingViews.as_view({"post": "post_publicbooking"})),

path('payment', PaymentViews.as_view({"get": "get_payment",
                                                "post": "post_payment",
                                                "patch": "update_payment",
                                                "delete": "delete_payment"})),

path('contact', ContactViews.as_view({"get": "get_contact",
                                                "post": "post_contact"})),

# path('bookroom', BookingViewSet.as_view({"post": "post_bookroom"})),

]
