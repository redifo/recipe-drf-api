# Generated by Django 3.2.25 on 2024-04-24 09:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0001_initial'),
        ('likes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='like',
            name='is_like',
            field=models.BooleanField(),
        ),
        migrations.AlterField(
            model_name='like',
            name='review',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='reviews.review'),
        ),
    ]
