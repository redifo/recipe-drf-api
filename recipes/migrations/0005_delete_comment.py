# Generated by Django 3.2.25 on 2024-04-20 20:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0004_comment_updated_at'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Comment',
        ),
    ]
