# fetch_courses.py

import requests
from datetime import datetime
from django.core.management.base import BaseCommand
from django.conf import settings
from fetcher.models import RawCourse, RawClass, RawClassSchedule

class Command(BaseCommand):
    help = 'Fetch data from UW API and save it to the database'

    def _convert_to_datetime(self, date: str) -> datetime:
        return datetime.strptime(date, "%Y-%m-%dT%H:%M:%S")

    def handle(self, *args, **kwargs):
        uw_courses_url = settings.UWATERLOO_API_ENDPOINT + "Courses/" + settings.UWATERLOO_TERM_CODE + "/CS"
        uw_api_key = settings.UWATERLOO_API_KEY
        headers= {'x-api-key': uw_api_key}

        # Fetch courses
        response = requests.get(uw_courses_url, headers=headers)

        if response.status_code != 200:
            self.stderr.write('Failed to fetch courses')
            return
        
        courses_data = response.json()

        # Delete the previous data and store the new data
        RawCourse.delete_data()
        RawClass.delete_data()
        RawClassSchedule.delete_data()

        # Fetch class data for each course
        for course in courses_data:
            course_id = course.get('courseId')
            uw_class_url = settings.UWATERLOO_API_ENDPOINT + "ClassSchedules/" + settings.UWATERLOO_TERM_CODE + "/" + course_id
            classes_response = requests.get(uw_class_url, headers=headers)
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
            course_offer_number=course_data.get('courseOfferNumber'),
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
            max_enrollment_capacity= class_data['maxEnrollmentCapacity']
        )

        if schedule_data:
            for schedule in schedule_data:
                print(schedule)
                schedule_instance, _ = RawClassSchedule.objects.get_or_create(
                    class_section=schedule['classSection'],
                    schedule_start_date=self._convert_to_datetime(schedule['scheduleStartDate']),
                    schedule_end_date=self._convert_to_datetime(schedule['scheduleEndDate']),
                    class_meeting_start_time=self._convert_to_datetime(schedule['classMeetingStartTime']),
                    class_meeting_end_time=self._convert_to_datetime(schedule['classMeetingEndTime']),
                    class_meeting_day_pattern_code=schedule['classMeetingDayPatternCode'],
                    class_meeting_week_pattern_code=schedule['classMeetingWeekPatternCode'],
                    location_name=schedule['locationName'],
                )
                section.schedule_data.add(schedule_instance)

        section.save()
