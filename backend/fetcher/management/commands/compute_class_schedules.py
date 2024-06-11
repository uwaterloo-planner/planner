# compute_class_schedules.py

from django.core.management.base import BaseCommand
from fetcher.models import RawCourse, RawClass, CourseClassSchedules
from fetcher.utils import classes_overlap
from fetcher.serializers import CourseSerializer
from itertools import groupby, product, combinations
from typing import List


class Command(BaseCommand):
    help = "Fetch data from database and computed its valid schedules"
    CourseClassSchedules.delete_data()

    def handle(self, *args, **kwargs):
        all_courses = CourseSerializer(RawCourse.objects, many=True).data
        for course in all_courses:
            course_id = course["course_id"]
            all_classes = RawClass.objects.filter(course_id__iexact=course_id)
            valid_schedules = self.generate_valid_class_schedules(all_classes)

            valid_class_schedules = CourseClassSchedules(
                course_id=course_id, valid_schedules=valid_schedules
            )
            valid_class_schedules.save()

    # Generates class schedules for a given single course
    def generate_valid_class_schedules(self, class_list):
        class_list = sorted(class_list, key=lambda x: x.course_component)
        subgroups = {}
        for key, group in groupby(class_list, key=lambda x: x.course_component):
            subgroups[key] = list(group)

        all_combinations = product(*subgroups.values())
        filtered_combinations: List[List[int]] = []
        for combination in all_combinations:
            if all(
                not classes_overlap(class1, class2)
                for class1, class2 in combinations(combination, 2)
            ):
                filtered_combinations.append(
                    [class_data.class_section for class_data in combination]
                )
        return filtered_combinations
