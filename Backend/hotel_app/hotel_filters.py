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


class GuestFilter(django_filters.FilterSet):
    id = CharFilter(field_name='id')
    address = django_filters.CharFilter(lookup_expr='icontains')  # Filter for partial matches in address
    date_of_birth = django_filters.DateFilter()  # Exact match for date of birth
    passport = django_filters.CharFilter(lookup_expr='exact')  # Exact match for passport
    user = django_filters.ModelChoiceFilter(queryset=User.objects.all())  # Filter by related User
    
    class Meta:
        model = Guest
        fields = ['address', 'date_of_birth', 'passport', 'user']


class RoomFilter(django_filters.FilterSet):
    id = CharFilter(field_name='id')
    price_min = django_filters.NumberFilter(field_name='price_per_night', lookup_expr='gte')
    price_max = django_filters.NumberFilter(field_name='price_per_night', lookup_expr='lte')
    capacity_min = django_filters.NumberFilter(field_name='capacity', lookup_expr='gte')
    capacity_max = django_filters.NumberFilter(field_name='capacity', lookup_expr='lte')
    category = django_filters.ChoiceFilter(choices=Room.ROOM_CATEGORIES)
    is_available = django_filters.BooleanFilter(field_name='is_available')

    class Meta:
        model = Room
        fields = ['category', 'price_per_night', 'is_available', 'capacity']

class ContactFilter(FilterSet):
    id = CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    name = CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Contact
        fields ='__all__'
