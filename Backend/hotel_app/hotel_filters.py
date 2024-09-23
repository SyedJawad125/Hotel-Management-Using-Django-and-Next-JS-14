from django_filters import DateFilter, CharFilter, FilterSet
from .models import *
import django_filters


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


class RoomFilter(django_filters.FilterSet):
    price_min = django_filters.NumberFilter(field_name='price_per_night', lookup_expr='gte')
    price_max = django_filters.NumberFilter(field_name='price_per_night', lookup_expr='lte')
    capacity_min = django_filters.NumberFilter(field_name='capacity', lookup_expr='gte')
    capacity_max = django_filters.NumberFilter(field_name='capacity', lookup_expr='lte')
    category = django_filters.ChoiceFilter(choices=Room.ROOM_CATEGORIES)
    is_available = django_filters.BooleanFilter(field_name='is_available')

    class Meta:
        model = Room
        fields = ['category', 'price_per_night', 'is_available', 'capacity']