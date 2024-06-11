# Generated by Django 5.0.6 on 2024-06-11 18:02

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CourseClassSchedules',
            fields=[
                ('course_id', models.CharField(max_length=31, primary_key=True, serialize=False)),
                ('valid_schedules', django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=None), size=None)),
            ],
        ),
        migrations.CreateModel(
            name='RawClassSchedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('schedule_start_date', models.DateField()),
                ('schedule_end_date', models.DateField()),
                ('class_section', models.IntegerField()),
                ('class_meeting_start_time', models.TimeField()),
                ('class_meeting_end_time', models.TimeField()),
                ('class_meeting_day_pattern_code', models.CharField(max_length=31)),
                ('class_meeting_week_pattern_code', models.CharField(max_length=31)),
            ],
        ),
        migrations.CreateModel(
            name='RawCourse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course_id', models.CharField(max_length=31, null=True)),
                ('subject_code', models.CharField(max_length=31, null=True)),
                ('catalog_number', models.CharField(max_length=31, null=True)),
                ('title', models.CharField(max_length=255, null=True)),
                ('course_component_code', models.CharField(max_length=31, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CoursesOverlap',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course1_id', models.IntegerField()),
                ('course2_id', models.IntegerField()),
                ('course1_classes', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=None)),
                ('course2_classes', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=None)),
                ('result', models.BooleanField()),
            ],
            options={
                'indexes': [models.Index(fields=['course1_id', 'course2_id', 'course1_classes', 'course2_classes'], name='scheduler_c_course1_cef34f_idx')],
                'unique_together': {('course1_id', 'course2_id', 'course1_classes', 'course2_classes')},
            },
        ),
        migrations.CreateModel(
            name='RawClass',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course_id', models.CharField(max_length=31)),
                ('class_section', models.IntegerField()),
                ('course_component', models.CharField(max_length=31)),
                ('schedule_data', models.ManyToManyField(to='scheduler.rawclassschedule')),
            ],
        ),
    ]
