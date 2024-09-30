from django.urls import path
from .views import ContactViews, EmployeeViews, GuestViews, RoomViews, PaymentViews, BookingViewSet, PaymentViewSet


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
path('booking', RoomViews.as_view({"get": "get_booking",
                                                "post": "post_booking",
                                                "patch": "update_booking",
                                                "delete": "delete_booking"})),

path('payment', PaymentViews.as_view({"get": "get_payment",
                                                "post": "post_payment",
                                                "patch": "update_payment",
                                                "delete": "delete_payment"})),

path('contact', ContactViews.as_view({"get": "get_contact",
                                                "post": "post_contact"})),

# path('rooms', RoomViewSet.as_view({"get": "list", "post": "create"})),
# path('rooms/<int:pk>', RoomViewSet.as_view({"get": "retrieve", "patch": "partial_update", "delete": "destroy"})),

path('bookings', BookingViewSet.as_view({"get": "list", "post": "create"})),
path('bookings/<int:pk>', BookingViewSet.as_view({"get": "retrieve", "patch": "partial_update", "delete": "destroy"})),

path('payments', PaymentViewSet.as_view({"get": "list", "post": "create"})),
path('payments/<int:pk>', PaymentViewSet.as_view({"get": "retrieve", "patch": "partial_update", "delete": "destroy"})),

]
