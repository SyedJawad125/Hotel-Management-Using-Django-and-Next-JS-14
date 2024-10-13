from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .images_controller import ImagesController
from utils.base_authentication import JWTAuthentication

# Create your views here.


images_controller = ImagesController()


class ImagesViews(ModelViewSet):
    authentication_classes = [JWTAuthentication]

    def post_images(self, request):
        return images_controller.create(request)
    
    def get_images(self, request):
        return images_controller.get_images(request)
    
    def update_images(self, request):
        return images_controller.update_images(request)
    
    def delete_images(self, request):
        return images_controller.delete_images(request)