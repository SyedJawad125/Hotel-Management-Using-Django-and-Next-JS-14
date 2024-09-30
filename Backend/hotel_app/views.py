from django.shortcuts import render
from hotel_app.hotel_filters import RoomFilter
from permissions.decorator import permission_required
from . models import Employee
from django.shortcuts import render,HttpResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
#from .blog_serializer import BlogSerializer
from utils.base_authentication import JWTAuthentication
from .hotel_controller import ContactController, EmployeeController, RoomController, GuestController, BookingController, PaymentController


employee_controller = EmployeeController()
guest_controller = GuestController()
room_controller = RoomController()
booking_controller = BookingController()
payment_controller = PaymentController()
contact_controller = ContactController()



class EmployeeViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]

    # @permission_required(['create_employee'])
    def post_employee(self, request):
        return employee_controller.create(request)
    
    # @permission_required(['read_employee'])
    def get_employee(self, request):
        return employee_controller.get_employee(request)

    # @permission_required(['update_employee'])
    def update_employee(self, request):
        return employee_controller.update_employee(request)

    # @permission_required(['delete_employee'])
    def delete_employee(self, request):
        return employee_controller.delete_employee(request)
    
class GuestViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]

    def post_guest(self, request):
        return guest_controller.create_guest(request)
    
    def get_guest(self, request):
        return guest_controller.get_guest(request)
    
    def update_guest(self, request):
        return guest_controller.update_guest(request)
    
    def delete_guest(self, request):
        return guest_controller.delete_guest(request)
    
class RoomViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]

    def post_room(self, request):
        return room_controller.create(request)
    
    def get_room(self, request):
        return room_controller.get_room(request)

    def update_room(self, request):
        return room_controller.update_room(request)

    def delete_room(self, request):
        return room_controller.delete_room(request)
    

class BookingViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]

    def post_booking(self, request):
        return booking_controller.create(request)
    
    def get_booking(self, request):
        return booking_controller.get_booking(request)

    def update_booking(self, request):
        return booking_controller.update_booking(request)

    def delete_booking(self, request):
        return booking_controller.delete_booking(request)
    
class PaymentViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]

    def post_payment(self, request):
        return payment_controller.create(request)
    
    def get_payment(self, request):
        return payment_controller.get_payment(request)

    def update_payment(self, request):
        return payment_controller.update_payment(request)

    def delete_payment(self, request):
        return payment_controller.delete_payment(request)
    
class ContactViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]

    def post_contact(self, request):
        return contact_controller.create(request)

    def get_contact(self, request):
        return contact_controller.get_contact(request)
    


from rest_framework import viewsets
from rest_framework import permissions
from .models import Room, Booking, Payment
from hotel_app.hotel_serializer import BookingSerializer, PaymentSerializer
# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

# class RoomViewSet(viewsets.ModelViewSet):
#     # authentication_classes = [JWTAuthentication]

#     queryset = Room.objects.all()
#     serializer_class = RoomSerializer
#     # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
#     filter_backends = [DjangoFilterBackend]
#     filterset_class = RoomFilter

#     def get_queryset(self):
#         """
#         Optionally filter rooms based on availability and other filters.
#         """
#         queryset = Room.objects.filter(is_available=True)
#         return queryset
    

class BookingViewSet(viewsets.ModelViewSet):
    # authentication_classes = [JWTAuthentication]
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    # permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Check room availability before creating a booking
        room = Room.objects.get(id=request.data['room'])
        if room.is_available:
            # Create the booking
            room.is_available = False  # Mark the room as unavailable
            room.save()
            return super().create(request, *args, **kwargs)
        else:
            return Response({"error": "Room is not available"}, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save(guest=self.request.user.guest)


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Ensure the booking exists and process the payment
        booking = Booking.objects.get(id=request.data['booking'])
        if booking:
            return super().create(request, *args, **kwargs)
        return Response({"error": "Invalid booking"}, status=status.HTTP_400_BAD_REQUEST)