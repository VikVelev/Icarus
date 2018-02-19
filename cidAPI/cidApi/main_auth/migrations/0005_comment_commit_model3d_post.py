# Generated by Django 2.0.2 on 2018-02-19 20:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main_auth', '0004_auto_20180219_2034'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_posted', models.DateField()),
                ('content', models.TextField()),
                ('posted_by', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='main_auth.User')),
            ],
        ),
        migrations.CreateModel(
            name='Commit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('previous_model', models.FilePathField()),
                ('present_model', models.FilePathField()),
                ('date', models.DateTimeField()),
                ('polygons_changed', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Model3D',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('filename', models.FilePathField()),
                ('date_uploaded', models.DateTimeField()),
                ('polygons', models.IntegerField()),
                ('commits', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_auth.Commit')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(blank=True, null=True)),
                ('content', models.TextField(blank=True, null=True)),
                ('is_relevant', models.BooleanField()),
                ('is_recent', models.BooleanField()),
                ('likes', models.IntegerField(blank=True, null=True)),
                ('comments', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_auth.Comment')),
                ('posted_by', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='main_auth.User')),
            ],
        ),
    ]