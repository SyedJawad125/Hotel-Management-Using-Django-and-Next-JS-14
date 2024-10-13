from django.urls import path
from .views import ImagesViews


urlpatterns = [

path('images', ImagesViews.as_view({"get": "get_images",
                                                "post": "post_images",
                                                "patch": "update_images",
                                                "delete": "delete_images"})),

]