export interface UwaterlooClassSchedule {
    // courseId: string | null
    // courseOfferNumber: number
    // sessionCode: string | null
    classSection: number
    // termCode: string | null
    // classMeetingNumber: number
    scheduleStartDate: string // $date-time
    scheduleEndDate: string
    classMeetingStartTime: string
    classMeetingEndTime: string
    classMeetingDayPatternCode: string // | null (for now)
    classMeetingWeekPatternCode: string | null
    locationName: string | null
}

// interface UwaterlooClassInstructor {
//     courseId: string | null
//     courseOfferNumber: number
//     sessionCode: string | null
//     classSection: number
//     termCode: string | null
//     instructorRoleCode: string | null
//     instructorFirstName: string | null
//     instructorLastName: string | null
//     instructorUniqueIdentifier: string | null
//     classMeetingNumber: number
// }

export interface UwaterlooSection {
    courseId: string  // | null (for now)
    // courseOfferNumber: number
    // sessionCode: string | true
    classSection: number
    // termCode: string | null
    // classNumber: number
    courseComponent: string // | null (for now)
    // associatedClassCode: number
    maxEnrollmentCapacity: number
    // enrolledStudents: number
    // enrollConsentCode: string | null
    // enrollConsentDescription: string | null
    // dropConsentCode: string | null
    // dropConsentDescription: string | null
    scheduleData: UwaterlooClassSchedule[]  // | null (for now)
    // instructorData: UwaterlooClassInstructor[] | null
}

export type UwaterlooClass = UwaterlooSection[]

export type PlanClass = {[courseComponent: string]: UwaterlooSection[]}

export type FinalClass = {[courseComponent: string]: UwaterlooSection}
