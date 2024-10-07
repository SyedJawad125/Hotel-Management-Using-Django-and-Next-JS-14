from django.db import models
from user_auth.models import User
from django.core.validators import RegexValidator
from django.utils import timezone
from django.core.validators import MinValueValidator
from utils.validators import *
# from ckeditor.fields import RichTextField

class Employee(models.Model):
    alphabetic_validator = RegexValidator(
        regex='^[a-zA-Z]+$',
        message='This field accepts only alphabetic characters.',
        code='invalid_input'
    )
    numeric_validator = RegexValidator(
        regex='^[0-9]+$',
        message='Phone number must contain only digits.',
        code='invalid_phone_number'
    )
    alphanumeric_or_alpha_validator = RegexValidator(
        regex=r'^(?!^\d+$)[a-zA-Z0-9]+$',
        message='Position must contain only alphabetic or alphanumeric characters, but not only numbers.'
    )
    
    first_name = models.CharField(max_length=30, validators=[alphabetic_validator])
    last_name = models.CharField(max_length=30, validators=[alphabetic_validator])
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, validators=[numeric_validator])
    date_of_birth = models.DateField(validators=[validate_date_of_birth])
    hire_date = models.DateField(default=timezone.now)
    position = models.CharField(max_length=50, validators=[alphanumeric_or_alpha_validator])
    department = models.CharField(max_length=50, validators=[alphabetic_validator])
    salary = models.DecimalField(max_digits=10, decimal_places=2, validators=[validate_salary])
    is_active = models.BooleanField(default=True)
    image = models.ImageField(upload_to='employee_images/', blank=True, null=True, validators=[validate_image])
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='employee_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='employee_updated_by', null=True, blank=True)
    
    def save(self, *args, **kwargs):
        # Sanitize text fields to remove any potential XSS scripts
        self.first_name = bleach.clean(self.first_name)
        self.last_name = bleach.clean(self.last_name)
        self.email = bleach.clean(self.email)
        self.phone_number = bleach.clean(self.phone_number)
        self.position = bleach.clean(self.position)
        self.department = bleach.clean(self.department)
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
   
class Guest(models.Model):

    numeric_dash_validator = RegexValidator(
    regex=r'^[0-9-]+$',
    message='Passport must contain only numbers and dashes (-).'
    )
    no_dollar_dot_validator = RegexValidator(
    regex=r'^[^$.]+$',
    message='Address must not contain the dollar sign ($) or dot (.).'
    )

    address = models.TextField(validators=[no_dollar_dot_validator])
    date_of_birth = models.DateField(validators=[validate_date_of_birth])
    passport = models.CharField(max_length=13, blank=True, null=True, validators=[numeric_dash_validator])
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='userguest', null=True, blank=True)

from django.utils.translation import gettext_lazy as _
class Room(models.Model):
    numeric_validator = RegexValidator(
        regex='^[0-9]+$',
        message='Room Number must contain only digits.',
        code='invalid_room_number'  # Updated code
    )

    ROOM_CATEGORIES = [
        ('SINGLE', 'Single Room'),
        ('DOUBLE', 'Double Room'),
        ('SUITE', 'Suite'),
    ]
    room_number = models.CharField(max_length=5, unique=True, validators=[numeric_validator])
    category = models.CharField(max_length=15, choices=ROOM_CATEGORIES)
    price_per_night = models.DecimalField(max_digits=6, decimal_places=2, validators=[validate_price_per_night])
    is_available = models.BooleanField(default=True)
    capacity = models.IntegerField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='room_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='room_updated_by', null=True, blank=True)

    def clean(self):
        super().clean()
        if self.capacity < 1:
            raise ValidationError({'capacity': 'Capacity must be at least 1.'})
        
    def __str__(self):
        return f"Room {self.room_number} - {self.category}"
    

class Booking(models.Model):
    
    check_in = models.DateField()
    check_out = models.DateField()
    total_price = models.DecimalField(max_digits=8, decimal_places=2, validators=[validate_total_price])
    guest = models.ForeignKey(Guest, on_delete=models.CASCADE, related_name='guest1', null=True, blank=True)
    rooms = models.ManyToManyField(Room, related_name='bookings')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='booking_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='booking_updated_by', null=True, blank=True)

    def clean(self):
        if self.check_out <= self.check_in:
            raise ValidationError("Check-out date must be after the check-in date.")
        if self.check_in < timezone.now().date():
            raise ValidationError("Check-in date cannot be in the past.")
    def __str__(self):
        return f"Booking {self.id} by {self.guest}"
    
   
class Payment(models.Model):
    PAYMENT_METHODS = [
        ('CREDIT_CARD', 'Credit Card'),
        ('DEBIT_CARD', 'Debit Card'),
        ('PAYPAL', 'PayPal'),
        ('CASH', 'Cash'),
    ]
    amount = models.DecimalField(max_digits=8, decimal_places=2, validators=[validate_amount])
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=15, choices=PAYMENT_METHODS)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='booking1', null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='payment_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payment_updated_by', null=True, blank=True)
    

    def __str__(self):
        return f"Payment {self.id} for Booking {self.booking.id}"


class Contact(models.Model):

    alphabet_space_validator = RegexValidator(
    regex=r'^[A-Za-z]+( [A-Za-z]+)*$',
    message='Name must contain only alphabets and single spaces between words.'
    )
    numeric_validator = RegexValidator(
    regex='^[0-9]+$',
    message='Phone number must contain only digits.',
    code='invalid_phone_number'
    ) 

    name = models.CharField(max_length=100, validators=[alphabet_space_validator])
    email = models.EmailField(unique=False)
    phone_number = models.CharField(max_length=20, validators=[numeric_validator])
    message = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='contact_created_by',null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='contact_updated_by',null=True, blank=True)



from django.db import models
from user_auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=100, blank=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f'{self.user.username} Profile'
