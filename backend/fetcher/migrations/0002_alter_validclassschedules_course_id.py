# Generated by Django 5.0.6 on 2024-06-09 04:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fetcher', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='validclassschedules',
            name='course_id',
            field=models.CharField(max_length=31, null=True),
        ),
    ]
