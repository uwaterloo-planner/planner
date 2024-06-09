from .models import RawClass

def classes_overlap(first_class: RawClass, second_class: RawClass) -> bool:
    for schedule_data1 in first_class.schedule_data.all():
        for schedule_data2 in second_class.schedule_data.all():
            days_match = bool(set(schedule_data1.classMeetingDayPatternCode) & set(schedule_data2.classMeetingDayPatternCode))
            if (days_match and schedule_data1.classMeetingStartTime.time() <= schedule_data2.classMeetingEndTime.time() and
                schedule_data2.classMeetingStartTime.time() <= schedule_data1.classMeetingEndTime.time()):
                return True
    return False