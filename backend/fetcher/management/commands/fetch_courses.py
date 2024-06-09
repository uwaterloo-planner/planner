# fetch_courses.py

import requests
from datetime import datetime, time
from django.core.management.base import BaseCommand
from django.conf import settings
from fetcher.models import RawCourse, RawClass, RawClassSchedule, ValidClassSchedules

class Command(BaseCommand):
    help = 'Fetch data from UW API and save it to the database'

    def _convert_to_time(self, date: str) -> time:
        return datetime.strptime(date, "%Y-%m-%dT%H:%M:%S").time()

    def handle(self, *args, **kwargs):
        uw_api_url = settings.UWATERLOO_API_ENDPOINT
        uw_term_code = settings.UWATERLOO_TERM_CODE
        headers= {'x-api-key': settings.UWATERLOO_API_KEY}

        # Fetch courses
        courses_ep = f"{uw_api_url}/Courses/{uw_term_code}/CS"
        response = requests.get(courses_ep, headers=headers)

        if response.status_code != 200:
            self.stderr.write('Failed to fetch courses')
            return
        
        courses_data = response.json()

        # Delete the previous data and store the new data
        RawCourse.delete_data()
        RawClass.delete_data()
        RawClassSchedule.delete_data()
        ValidClassSchedules.delete_data()

        # Fetch class data for each course
        for course in courses_data:
            course_id = course.get('courseId')
            classes_ep = f"{uw_api_url}/ClassSchedules/{uw_term_code}/{course_id}"
            classes_response = requests.get(classes_ep, headers=headers)
            if classes_response.status_code != 200:
                self.stderr.write(f'Failed to fetch class data for course id: {course_id}. Response status code: {classes_response.status_code}')
                continue

            # List of classes
            self.save_course(course)
            classes_data = classes_response.json()
            for class_data in classes_data:
                self.save_class(class_data)

    def save_course(self, course_data):
        course = RawCourse(
            course_id=course_data.get('courseId'),
            subject_code=course_data.get('subjectCode'),
            catalog_number=course_data.get('catalogNumber'),
            title=course_data.get('title'),
            course_component_code=course_data.get('courseComponentCode')
        )
        course.save()

    def save_class(self, class_data):
        schedule_data = class_data.pop('scheduleData', [])

        section, _ = RawClass.objects.get_or_create(
            course_id=class_data['courseId'],
            class_section=class_data['classSection'],
            course_component= class_data['courseComponent'],
        )

        if schedule_data:
            for schedule in schedule_data:
                print(schedule)
                schedule_instance, _ = RawClassSchedule.objects.get_or_create(
                    class_section=schedule['classSection'],
                    class_meeting_start_time=self._convert_to_time(schedule['classMeetingStartTime']),
                    class_meeting_end_time=self._convert_to_time(schedule['classMeetingEndTime']),
                    class_meeting_day_pattern_code=schedule['classMeetingDayPatternCode'],
                    class_meeting_week_pattern_code=schedule['classMeetingWeekPatternCode'],
                )
                section.schedule_data.add(schedule_instance)

        section.save()
