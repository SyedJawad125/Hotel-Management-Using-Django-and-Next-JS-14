# Generated by Django 5.0.3 on 2024-09-24 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_auth', '0003_user_cnic_alter_user_is_staff_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='current_token',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='login_attempts',
            field=models.IntegerField(default=0),
        ),
    ]
