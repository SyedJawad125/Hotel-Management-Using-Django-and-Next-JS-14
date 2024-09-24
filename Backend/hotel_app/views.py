from django.shortcuts import render
from permissions.decorator import permission_required
from . models import Employee
from django.shortcuts import render,HttpResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
#from .blog_serializer import BlogSerializer
from utils.base_authentication import JWTAuthentication
from .hotel_controller import EmployeeController, RoomController, GuestController

employee_controller = EmployeeController()
guest_controller = GuestController()
room_controller = RoomController()



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
    # authentication_classes = [JWTAuthentication]

    def post_guest(self, request):
        return guest_controller.create_guest(request)

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