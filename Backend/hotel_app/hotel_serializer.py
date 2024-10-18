from rest_framework import serializers
from .models import Booking, Employee, Guest, Payment, Room, Contact
from rest_framework.serializers import ModelSerializer
from user_auth.user_serializer import UserListingSerializer


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
        

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None 

        return data
    
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None 

        return data
    # Custom validation for capacity
    def validate_capacity(self, value):
        if value < 1:
            raise serializers.ValidationError("Capacity must be at least 1.")
        return value
    
class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = '__all__'
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = UserListingSerializer(instance.user).data if instance.user else None

        return data

class BookingSerializer(serializers.ModelSerializer):
    rooms = serializers.PrimaryKeyRelatedField(queryset=Room.objects.all(), many=True)
    class Meta:
        model = Booking
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # data['room_category'] = instance.rooms.category if instance.rooms else None
        data['room_num'] = RoomSerializer(instance.rooms.all(), many=True).data if instance.rooms else None
        data['room_category'] = [room.category for room in instance.rooms.all()] if instance.rooms else None
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None

        # Add room_category for each room
        # data['room_category'] = [
        #     room.category.name if room.category else "No category" for room in instance.rooms.all()
        # ] if instance.rooms else None

        return data
    

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None

        return data
    
class ContactSerializer(ModelSerializer):
    class Meta:
        model = Contact
        fields='__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['created_by'] = UserListingSerializer(instance.created_by).data if instance.created_by else None
        data['updated_by'] = UserListingSerializer(instance.updated_by).data if instance.updated_by else None

        return data


class RoomAvailabilitySerializer(serializers.Serializer):
    check_in = serializers.DateField()
    check_out = serializers.DateField()

    def validate(self, data):
        if data['check_out'] <= data['check_in']:
            raise serializers.ValidationError("Check-out date must be after check-in date.")
        return data