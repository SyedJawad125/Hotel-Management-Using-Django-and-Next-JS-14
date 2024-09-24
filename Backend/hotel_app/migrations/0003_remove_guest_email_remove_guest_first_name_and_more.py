# Generated by Django 5.0.3 on 2024-09-24 16:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotel_app', '0002_room_created_by_room_updated_by'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='guest',
            name='email',
        ),
        migrations.RemoveField(
            model_name='guest',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='guest',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='guest',
            name='phone_number',
        ),
        migrations.AddField(
            model_name='guest',
            name='passport',
            field=models.CharField(blank=True, max_length=13, null=True),
        ),
    ]
