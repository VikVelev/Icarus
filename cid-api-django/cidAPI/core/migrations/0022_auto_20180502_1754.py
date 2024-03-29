# Generated by Django 2.0.4 on 2018-05-02 14:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0021_auto_20180502_1618'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='revision',
            name='commit',
        ),
        migrations.RemoveField(
            model_name='revision',
            name='description',
        ),
        migrations.AddField(
            model_name='revision',
            name='commit_details',
            field=models.TextField(default='test'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='revision',
            name='commit_textures',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='revision',
            name='commit_title',
            field=models.CharField(default='test123', max_length=64),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='commit',
            name='belongs_to_model',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commits', to='core.Model3D'),
        ),
        migrations.AlterField(
            model_name='revision',
            name='model',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='revisions', to='core.Model3D'),
        ),
    ]
