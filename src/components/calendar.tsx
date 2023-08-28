import React from 'react'
import { Calendar, dayjsLocalizer, Event } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import dayjs from 'dayjs'
import { FinalClass, UwaterlooClassSchedule } from '@/types'
import { courseIdsHashMap } from '@/constants'

interface CalendarProps {
    schedule: FinalClass[]
}

const localizer = dayjsLocalizer(dayjs)

const generateRecurringEvents = (schedule: FinalClass[]) => {
    const recurringEvents: Event[] = []

    schedule.forEach(inputClass => {
        for (const courseComponent in inputClass) {

            const title = `${courseIdsHashMap[inputClass[courseComponent].courseId]} (${courseComponent})`
            const scheduleDataArray: UwaterlooClassSchedule[] = inputClass[courseComponent].scheduleData
            scheduleDataArray.forEach(scheduleData =>  {
                const { scheduleStartDate, scheduleEndDate, classMeetingWeekPatternCode, classMeetingStartTime, classMeetingEndTime } = scheduleData

                const startTime = dayjs(classMeetingStartTime, 'HH:mm:ss')
                const endTime = dayjs(classMeetingEndTime, 'HH:mm:ss')

                let currentMoment = dayjs(scheduleStartDate)
                const endMoment = dayjs(scheduleEndDate)

                while (currentMoment.isBefore(endMoment) || currentMoment.isSame(endMoment)) {
                    if (classMeetingWeekPatternCode[currentMoment.day() === 0 ? 6 : currentMoment.day() - 1] === 'Y') {
                        recurringEvents.push({
                            title: title,
                            start: currentMoment.hour(startTime.hour()).minute(startTime.minute()).toDate(),
                            end: currentMoment.hour(endTime.hour()).minute(endTime.minute()).toDate(),
                        })
                    }
                    currentMoment = currentMoment.add(1, 'day')
                }
            })
        }
    })
    console.log(recurringEvents)
    return recurringEvents
};

const CalendarComponent: React.FC<CalendarProps> = ({ schedule }) => {
  const recurringEvents = generateRecurringEvents(schedule)

  return (
    <div>
      <h2>Event Calendar</h2>
      <Calendar localizer={localizer} events={recurringEvents} />
    </div>
  )
}

export default CalendarComponent
