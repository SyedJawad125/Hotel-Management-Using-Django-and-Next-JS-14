from django_filters import DateFilter, CharFilter, FilterSet
from .models import *



class EmployeeFilter(FilterSet):
    id = CharFilter(field_name='id')
    name = CharFilter(field_name='name', lookup_expr='icontains')
    position = CharFilter(field_name='position', lookup_expr='icontains')
    salary = CharFilter(field_name='salary')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    

    class Meta:
        model = Employee
        # fields ='__all__'
        exclude = ['image']