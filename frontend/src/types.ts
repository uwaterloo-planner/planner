export interface UwaterlooClassSchedule {
    classSection: number
    scheduleStartDate: string // $date-time
    scheduleEndDate: string
    classMeetingStartTime: string
    classMeetingEndTime: string
    classMeetingDayPatternCode: string | null
    classMeetingWeekPatternCode: string | null 
}

export interface UwaterlooSection {
    courseId: string
    classSection: number
    courseComponent: string
    scheduleData: UwaterlooClassSchedule[] | null
}

export type UwaterlooClass = UwaterlooSection[]

export type PlanClass = {[courseComponent: string]: UwaterlooSection[]}

export type FinalClass = {[courseComponent: string]: UwaterlooSection}

export type NewSchedule = {[courseId: string]: UwaterlooSection[]}
