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

class PublicRoomFilter(django_filters.FilterSet):
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


class BookingFilter(django_filters.FilterSet):
    id = CharFilter(field_name='id')
    guest = django_filters.CharFilter(field_name='guest__name', lookup_expr='icontains')
    room = django_filters.CharFilter(field_name='room__name', lookup_expr='icontains')
    check_in = django_filters.DateFilter(field_name='check_in', lookup_expr='exact')
    check_out = django_filters.DateFilter(field_name='check_out', lookup_expr='exact')
    total_price = django_filters.RangeFilter(field_name='total_price')

    class Meta:
        model = Booking
        fields = ['guest', 'room', 'check_in', 'check_out', 'total_price']

class PublicBookingFilter(django_filters.FilterSet):
    id = CharFilter(field_name='id')
    guest = django_filters.CharFilter(field_name='guest__name', lookup_expr='icontains')
    room = django_filters.CharFilter(field_name='room__name', lookup_expr='icontains')
    check_in = django_filters.DateFilter(field_name='check_in', lookup_expr='exact')
    check_out = django_filters.DateFilter(field_name='check_out', lookup_expr='exact')
    total_price = django_filters.RangeFilter(field_name='total_price')

    class Meta:
        model = Booking
        fields = ['guest', 'room', 'check_in', 'check_out', 'total_price']


class PaymentFilter(django_filters.FilterSet):
    # Define filters for each field
    amount = django_filters.NumberFilter(field_name="amount", lookup_expr='exact')
    min_amount = django_filters.NumberFilter(field_name="amount", lookup_expr='gte')
    max_amount = django_filters.NumberFilter(field_name="amount", lookup_expr='lte')
    payment_date = django_filters.DateFilter(field_name="payment_date", lookup_expr='exact')
    payment_date__gte = django_filters.DateFilter(field_name="payment_date", lookup_expr='gte')
    payment_date__lte = django_filters.DateFilter(field_name="payment_date", lookup_expr='lte')
    payment_method = django_filters.ChoiceFilter(field_name="payment_method", choices=Payment.PAYMENT_METHODS)
    booking = django_filters.ModelChoiceFilter(queryset=Booking.objects.all())
    created_by = django_filters.ModelChoiceFilter(queryset=User.objects.all())

    class Meta:
        model = Payment
        fields = ['amount', 'payment_date', 'payment_method', 'booking', 'created_by']

        
class ContactFilter(FilterSet):
    id = CharFilter(field_name='id')
    date_from = DateFilter(field_name='created_at', lookup_expr='gte' )
    date_to = DateFilter(field_name='created_at', lookup_expr='lte' )
    name = CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Contact
        fields ='__all__'
