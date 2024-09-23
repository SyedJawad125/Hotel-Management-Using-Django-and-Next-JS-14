from rest_framework import serializers
from .models import Contact, Employee, Product, Order, OrderDetail, Category
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