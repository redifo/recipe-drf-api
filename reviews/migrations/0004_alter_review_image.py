# Generated by Django 3.2.25 on 2024-05-01 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0003_alter_review_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='image',
            field=models.ImageField(blank=True, default=None, null=True, upload_to='review_pics'),
        ),
    ]