# Generated by Django 4.0.3 on 2022-06-10 22:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PayPal', '0007_alter_order_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='year_in_school',
            field=models.CharField(choices=[('PROC', 'PROCESSING'), ('CMPL', 'COMPLETED')], default='PROC', max_length=5),
        ),
    ]
