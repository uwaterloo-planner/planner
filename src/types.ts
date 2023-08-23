interface UwaterlooClassSchedule {
    courseId: string | null
    courseOfferNumber: number
    sessionCode: string | null
    classSection: number
    termCode: string | null
    classMeetingNumber: number
    scheduleStartDate: string // $date-time
    scheduleEndDate: string
    classMeetingStartTime: string
    classMeetingEndTime: string
    classMeetingDayPatternCode: string | null
    classMeetingWeekPatternCode: string | null
    locationName: string | null
}

interface UwaterlooClassInstructor {
    courseId: string | null
    courseOfferNumber: number
    sessionCode: string | null
    classSection: number
    termCode: string | null
    instructorRoleCode: string | null
    instructorFirstName: string | null
    instructorLastName: string | null
    instructorUniqueIdentifier: string | null
    classMeetingNumber: number
}

export interface UwaterlooClass {
    courseId: string | null
    courseOfferNumber: number
    sessionCode: string | true
    classSection: number
    termCode: string | null
    classNumber: number
    courseComponent: string | null
    associatedClassCode: number
    maxEnrollmentCapacity: number
    enrolledStudents: number
    enrollConsentCode: string | null
    enrollConsentDescription: string | null
    dropConsentCode: string | null
    dropConsentDescription: string | null
    scheduleData: UwaterlooClassSchedule[] | null
    instructorData: UwaterlooClassInstructor[] | null
}