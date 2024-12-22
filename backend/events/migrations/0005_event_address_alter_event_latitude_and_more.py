# Generated by Django 5.0.6 on 2024-12-13 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_event_time_zone'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='address',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='event',
            name='latitude',
            field=models.DecimalField(decimal_places=6, max_digits=9),
        ),
        migrations.AlterField(
            model_name='event',
            name='longitude',
            field=models.DecimalField(decimal_places=6, max_digits=9),
        ),
    ]
