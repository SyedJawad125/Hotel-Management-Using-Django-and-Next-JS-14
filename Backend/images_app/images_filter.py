from django_filters import CharFilter, FilterSet
from .models import *
import django_filters


class ImagesFilter(FilterSet):
    id = CharFilter(field_name='id')
    name = CharFilter(field_name='name')
    category = CharFilter(field_name='category')

    
    class Meta:
        model = Images
        fields ='__all__'
        # exclude = ['image']
