# Generated by Django 2.0.4 on 2018-05-02 22:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0025_revision_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='revision',
            old_name='date_resolved',
            new_name='date_modified',
        ),
    ]
