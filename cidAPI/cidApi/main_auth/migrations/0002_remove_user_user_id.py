# Generated by Django 2.0.2 on 2018-02-19 20:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main_auth', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='user_id',
        ),
    ]