import React, { useState } from "react"
import { GetServerSideProps } from "next"
import axios from 'axios'
import { Button, Container, Typography } from "@mui/material"
import AutoComplete from "@/components/autocomplete"
import CalendarComponent from "@/components/calendar"
import { chooseCourses, noResults, numberOfCourses, DJANGO_BACKEND_URL, SCHEDULES_EP, COURSE_LIST_EP, find } from "@/constants"
import { Course, Schedule } from "@/types"
import { snakeToCamel } from "@/utils"
import { useCoursesContext } from "./context"

interface PlanPageProps {
    coursesData: Course[] | null
    error?: string
}

const Plan: React.FC<PlanPageProps> = ({ coursesData, error}) => {
    if (error || coursesData === null || coursesData == undefined) {
        return (
            <Container 
                className="flex flex-col items-center justify-center min-h-screen"
            >
                Error: {error}
            </Container>
        )
    }

    const { selectedCourses } = useCoursesContext()
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [ errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const courseQuery = selectedCourses.map(course => course.courseId).join(',')
        try {
            const response = await axios.get(DJANGO_BACKEND_URL + SCHEDULES_EP, {
                params: {
                    courses: courseQuery
                }
            })
            const result = await response.data
            
            if (result.length === 0) {
                handleError(noResults)
                return
            }

            setSchedules(result)
        } catch (e: any) {
            console.error(e)
            handleError(e.message)
        }
    }

    const handleError = (error: string) => {
        setErrorMessage(error)
        setTimeout(() => {
            setErrorMessage('')
        }, 5000)
    }

    return (
        <Container className="flex items-center justify-center w-full mt-40 gap-4">
            <Container className="flex w-1/3 flex-col items-center gap-4">
                <Typography variant="h5" className="mb-4" >{chooseCourses}</Typography>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center">
                   {Array
                        .from({ length: numberOfCourses })
                        .map((_, index) => (
                            <AutoComplete key={index} availableCourses={coursesData} />
                        ))
                    }
                    <Button 
                        disabled={selectedCourses.length === 0} 
                        type='submit' 
                        variant="outlined"
                    >
                        {find}
                    </Button>
                </form>
                {errorMessage &&
                    <Typography 
                        variant="h6" 
                        className="text-red-500 text-center"
                    >
                        {errorMessage}
                    </Typography>
                }
            </Container>
            {schedules.length > 0 && 
                <Container >
                    <CalendarComponent 
                        schedule={snakeToCamel(schedules)} 
                        availableCourses={coursesData}/>
                </Container>
            }
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps<PlanPageProps> = async () => {
    try {
        const response = await axios.get(DJANGO_BACKEND_URL + COURSE_LIST_EP)
        const result: Course[] = await snakeToCamel(response.data)
        const sortedResults: Course[] = result.sort((a,b) => a.catalogNumber.localeCompare(b.catalogNumber))
        return { props: { coursesData: sortedResults}}
    } catch (e: any) {
        return { props: { coursesData: null, error: `Failed to load data. ${e.message}` } }
    }
}

export default Plan
