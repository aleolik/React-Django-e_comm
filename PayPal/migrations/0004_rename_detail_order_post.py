# Generated by Django 4.0.3 on 2022-06-10 17:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('PayPal', '0003_alter_order_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='detail',
            new_name='post',
        ),
    ]
