# Generated by Django 4.0.3 on 2022-04-30 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='firstname',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='lastname',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='phonenumber',
            field=models.TextField(blank=True, null=True),
        ),
    ]
