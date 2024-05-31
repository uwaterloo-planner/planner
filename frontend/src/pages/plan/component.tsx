import React, { useState } from "react"
import AutoComplete from "@/components/autocomplete"
import axios from 'axios'
import { PLAN_ENDPOINT, availableCoursesMap } from "@/constants"
import { Button, Container, Typography } from "@mui/material"
import { useCoursesContext } from "./context"
import { FinalClass } from "@/types"
import CalendarComponent from "@/components/calendar"

const Plan: React.FC = () => {
    const { selectedCourses } = useCoursesContext()
    const [schedules, setSchedules] = useState<FinalClass[][]>([])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
     
        const mappedCourseIds = selectedCourses.map((course) => availableCoursesMap[course])
        const courseQuery = mappedCourseIds.join(',')

        try {
            const response = await axios.get(PLAN_ENDPOINT, {
                params: {
                    course: courseQuery
                }
            })
            const result = await response.data
            setSchedules(result)
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <Container className="py-8">
            <Typography variant="h5" className="mb=4" >Select the courses you want to plan:</Typography>
            <form onSubmit={handleSubmit} className="space-y-4">
                <AutoComplete />
                <AutoComplete />
                <AutoComplete />
                <AutoComplete />
                <AutoComplete />
                <Button disabled={selectedCourses.length === 0} type='submit' variant="outlined" className="mt-4">Submit</Button>
            </form>
            {schedules.length ? <CalendarComponent schedule={schedules[0]}/> : null }
        </Container>

    )
}

export default Plan
