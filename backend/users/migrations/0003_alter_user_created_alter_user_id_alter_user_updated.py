# Generated by Django 5.0.6 on 2024-06-15 06:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_user_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='user',
            name='updated',
            field=models.DateTimeField(),
        ),
    ]