from typing import Tuple, List, Dict
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import RawClass, CourseClassSchedules
from ..serializers import ClassSchedulesSerializer
from ..utils import classes_overlap
import re


class ClassScheduleView(APIView):
    def get(self, request) -> Response:
        course_ids: List[str] = request.GET.get("courses", "").split(",")[:6]

        # Sanitizing course ids parameter
        decimal_number_regex = re.compile(r"^\d+$")
        if any(not decimal_number_regex.match(course) for course in course_ids):
            return Response(
                {"error": "courses parameter should contain valid course IDs."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        class_combinations_by_course: Dict[str, CourseClassSchedules] = (
            CourseClassSchedules.objects.in_bulk(course_ids, field_name="course_id")
        )

        class_data_by_course: Dict[str, Dict[int, RawClass]] = {
            id: {
                class_data.class_section: class_data
                for class_data in RawClass.objects.filter(course_id__iexact=id)
            }
            for id in course_ids
        }

        generated_schedules: List[List[Tuple[str, List[int]]]] = (
            self.generate_valid_class_schedules(
                class_combinations_by_course, class_data_by_course
            )
        )
        data: List[Dict[str, List[RawClass]]] = [
            {
                course_id: [
                    class_data_by_course[course_id][section_id]
                    for section_id in classes
                ]
                for course_id, classes in schedule
            }
            for schedule in generated_schedules
        ]

        return Response(
            ClassSchedulesSerializer(data, many=True).data, status=status.HTTP_200_OK
        )

        # Generates class schedules for a given courses

    def generate_valid_class_schedules(
        self,
        class_combinations_by_course: Dict[str, CourseClassSchedules],
        class_data_by_course: Dict[str, Dict[int, RawClass]],
    ) -> List[List[Tuple[str, List[int]]]]:

        course_ids = list(class_combinations_by_course.keys())

        # Base case
        # [[(course_id, [section_id ...] ... ] ... ]
        dp: List[List[Tuple[str, List[int]]]] = [
            [(course_ids[0], schedule)]
            for schedule in class_combinations_by_course[course_ids[0]].valid_schedules
        ]

        for current_course_id in course_ids[1:]:
            dp = [
                existing_schedule + [(current_course_id, current_course_classes)]
                for existing_schedule in dp  # schedule: [(course_id, [section_id ... ]) ...]
                for current_course_classes in class_combinations_by_course[
                    current_course_id
                ].valid_schedules  # current_course_classes: [section_id ... ]
                if all(
                    not self.courses_overlap(
                        existing_schedule_entry,
                        (current_course_id, current_course_classes),
                        class_data_by_course,
                    )
                    for existing_schedule_entry in existing_schedule  # existing_schedule_entry: (course_id, [section_id ... ])
                )
            ]
        print(dp)
        return dp

    def courses_overlap(
        self,
        existing_schedule: Tuple[int, List[int]],
        new_class_schedule: Tuple[int, List[int]],
        class_data_by_course: Dict[str, Dict[int, RawClass]],
    ) -> bool:
        course1_id, course1_classes = existing_schedule
        course2_id, course2_classes = new_class_schedule
        return any(
            classes_overlap(
                class_data_by_course[course1_id][section_id_1],
                class_data_by_course[course2_id][section_id_2],
            )
            for section_id_1 in course1_classes
            for section_id_2 in course2_classes
        )
