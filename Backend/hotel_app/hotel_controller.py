from django.db import transaction
from django.utils import timezone
from django.contrib.auth import authenticate
from hotel_app.hotel_filters import EmployeeFilter
from hotel_app.hotel_filters import *
from hotel_app.hotel_serializer import BookingSerializer, ContactSerializer, EmployeeSerializer, GuestSerializer, PaymentSerializer, RoomSerializer
from hotel_app.models import Employee
from user_auth.user_serializer import UserSerializer
from utils.reusable_methods import get_first_error_message, generate_six_length_random_number
from rest_framework.response import Response
from django.db.models import Sum, Count, Avg, F
from utils.helper import create_response, paginate_data
from utils.response_messages import *
from datetime import date, timedelta

from rest_framework import status
import logging
from django.shortcuts import get_object_or_404
# from vehicle.serializer import serializer
# from e_commerce.settings import EMAIL_HOST_USER
# from django.core.mail import send_mail




class EmployeeController:
    serializer_class = EmployeeSerializer
    filterset_class = EmployeeFilter

 
    def create(self, request):
        try:
            request.POST._mutable = True
            request.data["created_by"] = request.user.guid
            request.POST._mutable = False

            # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
            validated_data = EmployeeSerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = EmployeeSerializer(response).data
                return Response({'data': response_data}, 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data': error_message}, 400)
            # else:
            #     return Response({'data': "Permission Denaied"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)

    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_employee(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)


        except Exception as e:
            return Response({'error': str(e)}, 500)

    def update_employee(self, request):
        try:
            if "id" in request.data:
                # finding instance
                instance = Employee.objects.filter(id=request.data["id"]).first()

                if instance:
                    request.POST._mutable = True
                    request.data["updated_by"] = request.user.guid
                    request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = EmployeeSerializer(instance, data=request.data, partial=True)
                    # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = EmployeeSerializer(response).data
                        return Response({"data": response_data}, 200)
                    else:
                        error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
                        return Response({'data': error_message}, 400)
                    # else:
                    #     return Response({'data': "Permission Denaied"}, 400)
                else:
                    return Response({"data": "NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)

        except Exception as e:
            return Response({'error': str(e)}, 500)

    def delete_employee(self, request):
        try:
            if "id" in request.query_params:
                instance = Employee.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data": "SUCESSFULL"}, 200)
                else:
                    return Response({"data": "RECORD NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)
        
class GuestController:
    serializer_class = GuestSerializer
    filterset_class = GuestFilter

    def create_guest(self, request):
        try:
            user_data = request.data.pop("user", None)

            if user_data:
                logging.info(f"User data received: {user_data}")

                # Create a user using the user_data dictionary
                serialized_user = UserSerializer(data=user_data)

                if serialized_user.is_valid():
                    logging.info("User data is valid. Proceeding to save.")

                    # Start an atomic transaction
                    with transaction.atomic():
                        # Save the user instance
                        user_response = serialized_user.save()

                        # Debugging: Check if the user_response object has a guid
                        if not hasattr(user_response, 'guid'):
                            logging.error("User object doesn't have a GUID. Something went wrong while saving.")
                            return Response(
                                {'error': "User object doesn't have a GUID. User might not be saved correctly."},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR
                            )

                        logging.info(f"User saved successfully with GUID: {user_response.guid}")

                        # Now that the user is saved, it should have a GUID
                        request.data['user'] = user_response.guid  # Assign saved user's GUID to request data

                        # Serialize the guest data using the updated request.data
                        serialized_guest = GuestSerializer(data=request.data)

                        if serialized_guest.is_valid():
                            guest_response = serialized_guest.save()

                            return Response(
                                {
                                    'msg': 'Guest created successfully',
                                    'guest': GuestSerializer(guest_response).data
                                },
                                status=status.HTTP_201_CREATED
                            )
                        else:
                            transaction.set_rollback(True)
                            logging.error(f"Error in Guest data: {serialized_guest.errors}")
                            return Response(
                                {
                                    'msg': 'Error in Guest data',
                                    'errors': serialized_guest.errors
                                },
                                status=status.HTTP_400_BAD_REQUEST
                            )
                else:
                    logging.error(f"Error in User data: {serialized_user.errors}")
                    return Response(
                        {
                            'msg': 'Error in User data',
                            'errors': serialized_user.errors
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                logging.error("User data not provided.")
                return Response(
                    {
                        'msg': 'User data not provided'
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        except Exception as e:
            logging.error(f"Exception occurred: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    

    def get_guest(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)


        except Exception as e:
            return Response({'error': str(e)}, 500)
        

    def update_guest(self, request):
        try:
            # Retrieve 'id' from request data
            guest_id = request.data.get('id')

            if not guest_id:
                logging.error("Guest ID not provided in the request.")
                return Response(
                    {'msg': 'Guest ID not provided'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Fetch the existing guest record by guest_id
            guest = get_object_or_404(Guest, id=guest_id)

            # Pop user data from the request payload
            user_data = request.data.pop("user", None)

            if user_data:
                logging.info(f"User data received for update: {user_data}")

                # Fetch the existing user associated with this guest
                user_instance = get_object_or_404(User, guid=guest.user.guid)

                # Update the user instance with the provided data
                serialized_user = UserSerializer(user_instance, data=user_data, partial=True)

                if serialized_user.is_valid():
                    logging.info("User data is valid for update. Proceeding to save.")

                    # Start an atomic transaction
                    with transaction.atomic():
                        # Save the updated user instance
                        user_response = serialized_user.save()

                        logging.info(f"User updated successfully with GUID: {user_response.guid}")

                        # Now update the guest data
                        serialized_guest = GuestSerializer(guest, data=request.data, partial=True)

                        if serialized_guest.is_valid():
                            guest_response = serialized_guest.save()

                            return Response(
                                {
                                    'msg': 'Guest updated successfully',
                                    'guest': GuestSerializer(guest_response).data
                                },
                                status=status.HTTP_200_OK
                            )
                        else:
                            transaction.set_rollback(True)
                            logging.error(f"Error in Guest data during update: {serialized_guest.errors}")
                            return Response(
                                {
                                    'msg': 'Error in Guest data',
                                    'errors': serialized_guest.errors
                                },
                                status=status.HTTP_400_BAD_REQUEST
                            )
                else:
                    logging.error(f"Error in User data during update: {serialized_user.errors}")
                    return Response(
                        {
                            'msg': 'Error in User data',
                            'errors': serialized_user.errors
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                logging.error("User data not provided for update.")
                return Response(
                    {
                        'msg': 'User data not provided'
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        except Exception as e:
            logging.error(f"Exception occurred during guest update: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )



        
    def delete_guest(self, request):
        try:
            # Check if the request has 'id' in query parameters
            if "id" in request.query_params:
                guest_id = request.query_params['id']

                # Retrieve the Guest instance by ID
                guest_instance = Guest.objects.filter(id=guest_id).first()

                # If the Guest instance is found
                if guest_instance:
                    # Get the related User instance
                    user_instance = guest_instance.user

                    # Delete the Guest record
                    guest_instance.delete()

                    # Delete the associated User record
                    if user_instance:
                        user_instance.delete()

                    return Response({"data": "SUCCESSFULLY DELETED GUEST AND ASSOCIATED USER"}, status=200)
                else:
                    return Response({"data": "GUEST RECORD NOT FOUND"}, status=404)
            else:
                return Response({"data": "GUEST ID NOT PROVIDED"}, status=400)
        
        # Catch any exceptions that occur
        except Exception as e:
            logging.error(f"Exception occurred while deleting guest: {str(e)}")
            return Response({'error': str(e)}, status=500)


class RoomController:
    serializer_class = RoomSerializer
    filterset_class = RoomFilter

 
    def create(self, request):
        try:
            request.POST._mutable = True
            request.data["created_by"] = request.user.guid
            request.POST._mutable = False

            # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
            validated_data = RoomSerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = RoomSerializer(response).data
                return Response({'data': response_data}, 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data': error_message}, 400)
            # else:
            #     return Response({'data': "Permission Denaied"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)

    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_room(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)


        except Exception as e:
            return Response({'error': str(e)}, 500)

    def update_room(self, request):
        try:
            if "id" in request.data:
                # finding instance
                instance = Room.objects.filter(id=request.data["id"]).first()

                if instance:
                    request.POST._mutable = True
                    request.data["updated_by"] = request.user.guid
                    request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = RoomSerializer(instance, data=request.data, partial=True)
                    # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = RoomSerializer(response).data
                        return Response({"data": response_data}, 200)
                    else:
                        error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
                        return Response({'data': error_message}, 400)
                    # else:
                    #     return Response({'data': "Permission Denaied"}, 400)
                else:
                    return Response({"data": "NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)

        except Exception as e:
            return Response({'error': str(e)}, 500)

    def delete_room(self, request):
        try:
            if "id" in request.query_params:
                instance = Room.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data": "SUCESSFULL"}, 200)
                else:
                    return Response({"data": "RECORD NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)




class BookingController:
    serializer_class = BookingSerializer
    filterset_class = BookingFilter

 

    def create(self, request, *args, **kwargs):
        try:
            # Make POST data mutable
            request.POST._mutable = True

            # Get the list of room IDs from the request data
            room_ids = request.data.get('rooms', [])
            if not room_ids:
                return Response({'error': 'At least one room ID is required'}, 400)

            total_price = 0
            rooms = []

            for room_id in room_ids:
                try:
                    # Fetch the room object
                    room = Room.objects.get(id=room_id)
                except Room.DoesNotExist:
                    return Response({'error': f'Room with ID {room_id} does not exist'}, 404)

                if not room.is_available:
                    return Response({'error': f'Room with ID {room_id} is not available'}, 400)

                # Add room price to total price
                total_price += room.price_per_night
                rooms.append(room)

            # Set the total price and created_by field
            request.data["total_price"] = total_price
            request.data["created_by"] = request.user.guid

            # Proceed with validating and saving the booking
            validated_data = BookingSerializer(data=request.data)
            if validated_data.is_valid():
                # Save the booking and associate rooms
                booking = validated_data.save()

                # Link rooms to the booking
                booking.rooms.set(rooms)
                booking.save()

                # Mark the rooms as unavailable
                for room in rooms:
                    room.is_available = False
                    room.save()

                response_data = BookingSerializer(booking).data
                return Response({'data': response_data}, 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data': error_message}, 400)

        except Exception as e:
            return Response({'error': str(e)}, 500)
        
    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_booking(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)


        except Exception as e:
            return Response({'error': str(e)}, 500)

    def update_booking(self, request):
        try:
            if "id" in request.data:
                # finding instance
                instance = Booking.objects.filter(id=request.data["id"]).first()

                if instance:
                    request.POST._mutable = True
                    request.data["updated_by"] = request.user.guid
                    request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = BookingSerializer(instance, data=request.data, partial=True)
                    # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = BookingSerializer(response).data
                        return Response({"data": response_data}, 200)
                    else:
                        error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
                        return Response({'data': error_message}, 400)
                    # else:
                    #     return Response({'data': "Permission Denaied"}, 400)
                else:
                    return Response({"data": "NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)

        except Exception as e:
            return Response({'error': str(e)}, 500)

    def delete_booking(self, request):
        try:
            if "id" in request.query_params:
                instance = Booking.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data": "SUCESSFULL"}, 200)
                else:
                    return Response({"data": "RECORD NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)


class PaymentController:
    serializer_class = PaymentSerializer
    filterset_class = PaymentFilter

 
    # def create(self, request):
    #     try:
    #         request.POST._mutable = True
    #         request.data["created_by"] = request.user.guid
    #         request.POST._mutable = False

    #         # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
    #         validated_data = PaymentSerializer(data=request.data)
    #         if validated_data.is_valid():
    #             response = validated_data.save()
    #             response_data = PaymentSerializer(response).data
    #             return Response({'data': response_data}, 200)
    #         else:
    #             error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
    #             return Response({'data': error_message}, 400)
    #         # else:
    #         #     return Response({'data': "Permission Denaied"}, 400)
    #     except Exception as e:
    #         return Response({'error': str(e)}, 500)



    def create(self, request, *args, **kwargs):
        try:
            # Make POST data mutable
            request.POST._mutable = True
            request.data["created_by"] = request.user.guid
            request.POST._mutable = False

            # Check if the booking exists
            booking_id = request.data.get('booking')
            if not booking_id:
                return Response({'error': 'Booking ID is required'}, 400)

            try:
                # Fetch the booking object
                booking = Booking.objects.get(id=booking_id)
            except Booking.DoesNotExist:
                return Response({'error': 'Booking does not exist'}, 404)

            # Retrieve room number and total price from the booking
            room_number = booking.room.id  # Assuming `room.id` refers to room number
            amount = booking.total_price  # Fetching the total price from the booking

            # Add the amount to the payment request data
            request.POST._mutable = True
            request.data["amount"] = amount  # Set the amount based on the booking's total price
            request.POST._mutable = False

            # Proceed with validating and saving the payment
            validated_data = PaymentSerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()

                # Create response data, including room number and amount
                response_data = PaymentSerializer(response).data
                response_data['room_number'] = room_number  # Adding room number to the response

                return Response({'data': response_data}, 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data': error_message}, 400)

        except Exception as e:
            return Response({'error': str(e)}, 500)

    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_payment(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)


        except Exception as e:
            return Response({'error': str(e)}, 500)

    def update_payment(self, request):
        try:
            if "id" in request.data:
                # finding instance
                instance = Payment.objects.filter(id=request.data["id"]).first()

                if instance:
                    request.POST._mutable = True
                    request.data["updated_by"] = request.user.guid
                    request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = PaymentSerializer(instance, data=request.data, partial=True)
                    # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = PaymentSerializer(response).data
                        return Response({"data": response_data}, 200)
                    else:
                        error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
                        return Response({'data': error_message}, 400)
                    # else:
                    #     return Response({'data': "Permission Denaied"}, 400)
                else:
                    return Response({"data": "NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)

        except Exception as e:
            return Response({'error': str(e)}, 500)

    def delete_payment(self, request):
        try:
            if "id" in request.query_params:
                instance = Payment.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data": "SUCESSFULL"}, 200)
                else:
                    return Response({"data": "RECORD NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)

class ContactController:
    serializer_class = ContactSerializer
    filterset_class = ContactFilter

 
    def create(self, request):
        try:
            request.POST._mutable = True
            request.data["created_by"] = request.user.guid
            request.POST._mutable = False

            # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
            validated_data = ContactSerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = ContactSerializer(response).data
                return Response({'data': response_data}, 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data': error_message}, 400)
            # else:
            #     return Response({'data': "Permission Denaied"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)

    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_contact(self, request):
        try:

            instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)


        except Exception as e:
            return Response({'error': str(e)}, 500)
        
# class BookingRoomController:
#     serializer_class = BookingSerializer
#     filterset_class = BookingFilter
    

#     def post_bookroom(self, request):
#         try:
#             # Make POST data mutable
#             # request.POST._mutable = True
#             # request.data["created_by"] = request.user.guid
#             # request.POST._mutable = False

#             # Check room availability
#             room_id = request.data.get('room')
#             if not room_id:
#                 return Response({'error': 'Room ID is required'}, 400)

#             try:
#                 room = Room.objects.get(id=room_id)
#             except Room.DoesNotExist:
#                 return Response({'error': 'Room does not exist'}, 404)

#             if room.is_available:
#                 # Proceed with booking since the room is available
#                 room.is_available = False  # Mark the room as unavailable
#                 room.save()

#                 # Validate and save booking data
#                 validated_data = BookingSerializer(data=request.data)
#                 if validated_data.is_valid():
#                     response = validated_data.save()
#                     response_data = BookingSerializer(response).data
#                     return Response({'data': response_data}, 200)
#                 else:
#                     error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
#                     return Response({'data': error_message}, 400)
#             else:
#                 return Response({"error": "Room is not available"}, 400)

#         except Exception as e:
#             return Response({'error': str(e)}, 500)