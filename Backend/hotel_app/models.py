from django.db import models
from user_auth.models import User
from django.core.exceptions import ValidationError
# Create your models here.


class Employee(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    date_of_birth = models.DateField()
    hire_date = models.DateField()
    position = models.CharField(max_length=50)
    department = models.CharField(max_length=50)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    image = models.ImageField(upload_to='employee_images/', blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='employee_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='employee_updated_by', null=True, blank=True)


class Guest(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    address = models.TextField()
    date_of_birth = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='userguest', null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class Room(models.Model):
    ROOM_CATEGORIES = [
        ('SINGLE', 'Single Room'),
        ('DOUBLE', 'Double Room'),
        ('SUITE', 'Suite'),
    ]

    room_number = models.CharField(max_length=5, unique=True)
    category = models.CharField(max_length=15, choices=ROOM_CATEGORIES)
    price_per_night = models.DecimalField(max_digits=6, decimal_places=2)
    is_available = models.BooleanField(default=True)
    capacity = models.IntegerField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='room_created_by', null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='room_updated_by', null=True, blank=True)

    def __str__(self):
        return f"Room {self.room_number} - {self.category}"
    

class Booking(models.Model):
    guest = models.ForeignKey(Guest, on_delete=models.CASCADE, related_name='guest1', null=True, blank=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='room1', null=True, blank=True)
    check_in = models.DateField()
    check_out = models.DateField()
    total_price = models.DecimalField(max_digits=8, decimal_places=2)

    def clean(self):
        if self.check_out <= self.check_in:
            raise ValidationError("Check-out date must be after the check-in date.")


    def __str__(self):
        return f"Booking {self.id} by {self.guest}"
    

class Payment(models.Model):
    PAYMENT_METHODS = [
        ('CREDIT_CARD', 'Credit Card'),
        ('DEBIT_CARD', 'Debit Card'),
        ('PAYPAL', 'PayPal'),
        ('CASH', 'Cash'),
    ]

    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='booking1', null=True, blank=True)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=15, choices=PAYMENT_METHODS)

    def __str__(self):
        return f"Payment {self.id} for Booking {self.booking.id}"



class Contact(models.Model):

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=False)
    phone_number = models.CharField(max_length=20)
    message = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='contact_created_by',null=True, blank=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='contact_updated_by',null=True, blank=True)