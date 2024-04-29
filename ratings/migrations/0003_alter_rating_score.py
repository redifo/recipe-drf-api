# Generated by Django 3.2.25 on 2024-04-28 19:36

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratings', '0002_auto_20240420_2354'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='score',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)]),
        ),
    ]