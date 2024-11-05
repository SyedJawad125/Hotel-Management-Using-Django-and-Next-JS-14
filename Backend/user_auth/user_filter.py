from django_filters import CharFilter, FilterSet
from .models import *
import django_filters


class UserDetailsFilter(FilterSet):
    id = CharFilter(field_name='id')
    guid = CharFilter(field_name='guid')

    

    class Meta:
        model = User
        fields ='__all__'
        # exclude = ['image']