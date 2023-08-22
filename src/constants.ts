export const loadingStatus = 'loading'
export const authenticatedStatus = 'authenticated'

export const availableCoursesMap: { [key: string]: number } = {
    'CS 240': 4377,
    'CS 241': 4378,
    'CS 251': 4382,
    'CS 341': 4392,
    'CS 346': 16287,
    'CS 350': 11416,
    'CS 370': 4400 
}

export const availableCourses: string[] = Object.keys(availableCoursesMap)
