from django.db import models

# Create your models here.
class RawCourse(models.Model):
    course_id = models.CharField(max_length=255, null=True)
    course_offer_number = models.IntegerField()
    subject_code = models.CharField(max_length=255, null=True)
    catalog_number = models.CharField(max_length=255, null=True)
    title = models.CharField(max_length=255, null=True)
    course_component_code = models.CharField(max_length=255, null=True)

    @classmethod
    def delete_data(cls):
        cls.objects.all().delete()

class RawClassSchedule(models.Model):
    class_section = models.IntegerField()
    schedule_start_date = models.DateTimeField()
    schedule_end_date = models.DateTimeField()
    class_meeting_start_time = models.DateTimeField()
    class_meeting_end_time = models.DateTimeField()
    class_meeting_day_pattern_code = models.CharField(max_length=10)  # Can adjust length as needed
    class_meeting_week_pattern_code = models.CharField(max_length=10)  # Can djust length as needed
    location_name = models.CharField(max_length=255, null=True, blank=True)

    @classmethod
    def delete_data(cls):
        cls.objects.all().delete()

class RawClass(models.Model):
    course_id = models.CharField(max_length=255)  # Can adjust length as needed
    class_section = models.IntegerField()
    course_component = models.CharField(max_length=255)  # Can adjust length as needed
    max_enrollment_capacity = models.IntegerField()
    schedule_data = models.ManyToManyField(RawClassSchedule)

    @classmethod
    def delete_data(cls):
        cls.objects.all().delete()
