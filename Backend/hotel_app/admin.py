from django.contrib import admin
from .models import Booking, Employee, Payment, Room
# Register your models here

# Custom admin for Room model
class RoomAdmin(admin.ModelAdmin):
    # Fields to display in the list view
    list_display = ('room_number', 'category', 'price_per_night', 'is_available', 'capacity', 'created_by', 'updated_by')
    
    # Add filters for easier navigation
    list_filter = ('category', 'is_available')
    
    # Search functionality for room number and category
    search_fields = ('room_number', 'category')
    
    # Organize fields in the admin form view
    fieldsets = (
        (None, {
            'fields': ('room_number', 'category', 'price_per_night', 'capacity')
        }),
        ('Availability', {
            'fields': ('is_available',)
        }),
        ('Audit', {
            'fields': ('created_by', 'updated_by')
        }),
    )
    
    # To make sure 'created_by' and 'updated_by' are filled automatically
    def save_model(self, request, obj, form, change):
        if not obj.pk:  # If this is a new object
            obj.created_by = request.user
        obj.updated_by = request.user
        super().save_model(request, obj, form, change)

# Register Room model with custom admin class
admin.site.register(Room, RoomAdmin)




class BookingAdmin(admin.ModelAdmin):
    # Fields to display in the list view
    list_display = ('id', 'guest', 'room', 'check_in', 'check_out', 'total_price', 'created_by', 'updated_by')
    
    # Fields to filter the list by
    list_filter = ('check_in', 'check_out', 'guest', 'room')
    
    # Fields that can be searched
    search_fields = ('guest__first_name', 'guest__last_name', 'room__name', 'created_by__username', 'updated_by__username')
    
    # Fields to display in the form view when creating/editing a booking
    fieldsets = (
        (None, {
            'fields': ('guest', 'room', 'check_in', 'check_out', 'total_price')
        }),
        ('Audit Information', {
            'fields': ('created_by', 'updated_by')
        }),
    )
    
    # Automatically set 'created_by' and 'updated_by' fields
    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.created_by = request.user
        obj.updated_by = request.user
        super().save_model(request, obj, form, change)

# Register the Booking model with the custom admin
admin.site.register(Booking, BookingAdmin)




# Custom admin for the Payment model
class PaymentAdmin(admin.ModelAdmin):
    # Fields to display in the list view
    list_display = ('id', 'amount', 'payment_date', 'payment_method', 'booking', 'created_by', 'updated_by')
    
    # Filters to allow filtering by payment method, booking, and created_by
    list_filter = ('payment_method', 'booking', 'created_by')
    
    # Fields to search by
    search_fields = ('booking__id', 'created_by__username', 'updated_by__username')
    
    # Organize fields into sections for better readability in the detail view
    fieldsets = (
        (None, {
            'fields': ('amount', 'payment_method', 'booking')
        }),
        ('Date Information', {
            'fields': ('payment_date',)
        }),
        ('Created/Updated By', {
            'fields': ('created_by', 'updated_by')
        }),
    )
    
    # Making fields read-only where necessary (payment_date auto-generated)
    readonly_fields = ('payment_date',)

# Register the Payment model with the admin site
admin.site.register(Payment, PaymentAdmin)




class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'position', 'department')

admin.site.register(Employee, EmployeeAdmin)



# models
# from django.db import models



# class User(AbstractUser):
#     username            = models.CharField(max_length=100, unique=True)
#     full_name           = models.CharField(max_length=200)
#     email               = models.EmailField(max_length=100, blank=True, null=True)
#     cnic                = models.CharField(max_length=13, blank=True, null=True)
#     mobile              = models.CharField(max_length=20, unique=True, blank=True, null=True)
#     profile_image       = models.ImageField(max_length=255, upload_to=get_profile_image_path, null=True, blank=True, default=get_default_profile_image_path)
#     role                = models.ForeignKey('Role', related_name='users', blank=True, null=True, on_delete=models.CASCADE)
#     login_attempts      = models.IntegerField(default=0)
#     is_blocked          = models.BooleanField(default=False)
#     created_at          = models.DateTimeField(auto_now_add=True)
#     created_by          = models.ForeignKey('User', related_name='+', blank=True, null=True, on_delete=models.CASCADE)
#     updated_at          = models.DateTimeField(auto_now=True)
#     updated_by          = models.ForeignKey('User', related_name='+', blank=True, null=True, on_delete=models.CASCADE)
#     is_staff            = models.BooleanField(default=False)
#     is_superuser        = models.BooleanField(default=False)
#     current_token       = models.CharField(max_length=500, blank=True, null=True)



# class Guest(models.Model):
#     user = models.ForeignKey('user', related_name='annny', on_delete=models.CASCADE)
#     passport = models.CharField(max_length=200)
#     # any new fields




# controller


# from django.db import transaction


# class GuestController:

#     def create_guest(self,request):
#         try:
#             #user ki dictionery request.data se bahir nikal len ge
#             user = request.data.pop("user") if "user" in request.data else None

#             if user:
#                 # aur phr user bnayen ge
#                 serialized_user = UserSerializer(data=request.data)

#                 if serialized_user.is_valid():
#                     with transaction.atomic():
#                         #agr user ban jaye
#                         user_response = serialized_user.save()

#                         # toh user ki id Guest mein de den ge
#                         request.data['user'] = user_response.id
                        
#                         serialized_guest = GuestSerializer(data=request.data)

#                         if serialized_guest.is_valid()
#                             guest_response = serialized_guest.save()

#                             # yahan success ka response send kr dein#
#                         else:
#                             transaction.set_rollback(True)
#                             # yahan serialized_guest ka error throw kr dein#
#                             # return create_response({'msg': get_first_error_message_from_serializer(serialized_guest.errors)}, status=status.HTTP_400_BAD_REQUEST)

#                 else:
#                     # yahan serialized_user ka error throw kr dein#
#                     # return create_response({'msg': get_first_error_message_from_serializer(serialized_user.errors)}, status=status.HTTP_400_BAD_REQUEST)


#         except Exception as e:
#             print(str(e))