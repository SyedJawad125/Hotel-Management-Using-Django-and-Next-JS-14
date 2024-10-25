from django.core.exceptions import ValidationError
from datetime import date
from PIL import Image
import bleach

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
def validate_image(image):
    try:
        img = Image.open(image)
        img.verify()
        # Check file size (in bytes), e.g., max 5MB
        max_file_size = 5 * 1024 * 1024
        if image.size > max_file_size:
            raise ValidationError("Image file size must be under 5MB.")
        
        # Optional: Check for allowed formats
        allowed_formats = ['JPEG','jpeg', 'PNG', 'png', 'JPG', 'jpg', 'WEBP', 'webp']
        if img.format not in allowed_formats:
            raise ValidationError(f"Allowed formats are: {', '.join(allowed_formats)}")
        
    except (IOError, SyntaxError) as e:
        raise ValidationError("Invalid image file.")
