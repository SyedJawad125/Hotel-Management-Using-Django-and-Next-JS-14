from django.urls import path
from .views import EmployeeViews



urlpatterns = [

path('employee', EmployeeViews.as_view({"get": "get_employee",
                                                "post": "post_employee",
                                                "patch": "update_employee",
                                                "delete": "delete_employee"})),
]
