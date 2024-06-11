import React from 'react'
import dayjs from 'dayjs'
import { FinalClass, NewSchedule, UwaterlooClassSchedule } from '@/types'
import { courseIdsHashMap } from '@/constants'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from '@fullcalendar/multimonth'
import { EventInput } from '@fullcalendar/core/index.js'


interface CalendarProps {
    schedule: NewSchedule
}

const generateRecurringEvents = (schedule: NewSchedule) => {
    const recurringEvents: EventInput[] = []
    console.log(schedule)

    for (const [courseId, courseClasses] of Object.entries(schedule)) {
        for (const courseClass of courseClasses) {
            const title = courseId
            // const title = `${courseIdsHashMap[inputClass[courseComponent].courseId]} (${courseComponent})`
            // const scheduleDataArray: UwaterlooClassSchedule[] = inputClass[courseComponent].scheduleData ?? []
            console.log(courseClass, courseClass.scheduleData)
            courseClass.scheduleData?.forEach(scheduleData =>  {
                console.log(scheduleData)
                const { scheduleStartDate, scheduleEndDate, classMeetingWeekPatternCode, classMeetingStartTime, classMeetingEndTime } = scheduleData

                const [startTimeHour, startTimeMinute] = classMeetingStartTime.split(':').map(Number)
                const [endTimeHour, endTimeMinute] = classMeetingEndTime.split(':').map(Number)

                let currentMoment = dayjs(scheduleStartDate)
                const endMoment = dayjs(scheduleEndDate)

                while ((currentMoment.isBefore(endMoment) || currentMoment.isSame(endMoment)) && classMeetingWeekPatternCode !== null) {
                    if (classMeetingWeekPatternCode[currentMoment.day() === 0 ? 6 : currentMoment.day() - 1] === 'Y') {
                        recurringEvents.push({
                            title: title,
                            start: currentMoment.hour(startTimeHour).minute(startTimeMinute).toDate(),
                            end: currentMoment.hour(endTimeHour).minute(endTimeMinute).toDate(),
                        })
                    }
                    currentMoment = currentMoment.add(1, 'day')
                }
            })
        }
    }
    console.log(recurringEvents)
    return recurringEvents
}

const CalendarComponent: React.FC<CalendarProps> = ({ schedule }) => {
  const recurringEvents = generateRecurringEvents(schedule)

  // a custom render function
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
  
  return (
    <div>
      <h1>Demo App</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, multiMonthPlugin]}
        initialView='multiMonthFourMonth'
        weekends={false}
        events={recurringEvents}
        eventContent={renderEventContent}
        views={{
            multiMonthFourMonth: {
                type: 'multiMonth',
                duration: { months: 4 }
            }
        }}
        visibleRange={{
            start: '2024-05-01',
            end: '2024-08-31'
          }}
      />
    </div>
  )
//   return (
//     <div>
//       <h2>Courses Calendar</h2>
//       <Calendar localizer={localizer} events={recurringEvents} />
//     </div>
//   )
}

export default CalendarComponent
