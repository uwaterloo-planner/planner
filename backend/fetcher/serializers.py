# fetcher/serializers.py
from rest_framework import serializers
from .models import RawCourse, RawClass, RawClassSchedule

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = RawCourse
        fields = ['course_id', 'subject_code', 'catalog_number']

class ClassScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = RawClassSchedule
        exclude = ['id']

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = RawClass
        exclude = ['id']

    schedule_data = ClassScheduleSerializer(many=True)

class ClassListSerializer(serializers.ListSerializer):
    child = ClassSerializer()
