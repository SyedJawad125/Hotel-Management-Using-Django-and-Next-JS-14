from django.core.exceptions import ValidationError
from datetime import date


def validate_date_of_birth(value):
    if value >= date.today():
        raise ValidationError("Date of birth must be in the past.")
def validate_salary(value):
        if value <= 0:
            raise ValidationError('Salary must be greater than zero.')
def validate_price_per_night(value):
    if value <= 0:
        raise ValidationError('Price per night must be greater than zero.')     
def validate_total_price(value):
    if value <= 0:
        raise ValidationError('Total Price must be greater than zero.') 
def validate_amount(value):
    if value <= 0:
        raise ValidationError('Amount must be greater than zero.') 