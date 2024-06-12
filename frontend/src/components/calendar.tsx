import React from 'react'
import dayjs from 'dayjs'
import { Course, Schedule } from '@/types'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { EventInput } from '@fullcalendar/core/index.js'
import { Container } from '@mui/material'
import { getCourseName } from '@/utils'

interface CalendarProps {
    schedule: Schedule[]
    availableCourses: Course[]
}

const generateRecurringEvents = (schedule: Schedule, availableCourses: Course[]) => {
    const recurringEvents: EventInput[] = []

    for (const [courseId, courseClasses] of Object.entries(schedule)) {
        const course = availableCourses.find((course) => course.courseId === courseId)
        if (course === undefined) {
          continue
        }

        const courseName = getCourseName(course)
        for (const courseClass of courseClasses) {
            const classTitle = `${courseName}: ${courseClass.courseComponent}`
            courseClass.scheduleData?.forEach(scheduleData =>  {
                const { 
                  scheduleStartDate, 
                  scheduleEndDate, 
                  classMeetingWeekPatternCode, 
                  classMeetingStartTime, 
                  classMeetingEndTime 
                } = scheduleData

                const [startTimeHour, startTimeMinute] = classMeetingStartTime.split(':').map(Number)
                const [endTimeHour, endTimeMinute] = classMeetingEndTime.split(':').map(Number)

                let currentMoment = dayjs(scheduleStartDate)
                const endMoment = dayjs(scheduleEndDate)

                while ((currentMoment.isBefore(endMoment) || currentMoment.isSame(endMoment)) && classMeetingWeekPatternCode !== null) {
                    if (classMeetingWeekPatternCode[currentMoment.day() === 0 ? 6 : currentMoment.day() - 1] === 'Y') {
                        recurringEvents.push({
                            title: classTitle,
                            start: currentMoment.hour(startTimeHour).minute(startTimeMinute).toDate(),
                            end: currentMoment.hour(endTimeHour).minute(endTimeMinute).toDate(),
                        })
                    }
                    currentMoment = currentMoment.add(1, 'day')
                }
            })
        }
    }
    return recurringEvents
}

const CalendarComponent: React.FC<CalendarProps> = ({ schedule, availableCourses }) => {
  const recurringEvents = generateRecurringEvents(schedule[0], availableCourses)
  
  return (
    <Container className="w-full">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView='timeGridWeek'
        weekends={false}
        events={recurringEvents}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'timeGridWeek,dayGridMonth'
        }}
        visibleRange={{
            start: '2024-05-01',
            end: '2024-08-31'
        }}
      />
    </Container>
  )
}

export default CalendarComponent
