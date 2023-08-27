import React from "react"
import AutoComplete from "@/components/autocomplete"
import axios from 'axios'
import { PLAN_ENDPOINT, availableCoursesMap } from "@/constants"
import { Button, Container, Typography } from "@mui/material"
import { useCoursesContext } from "./context"

const Plan: React.FC = () => {
    const { selectedCourses } = useCoursesContext()

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
            console.log(result)
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <Container>
            <Typography variant="h5">Select the courses you want to plan:</Typography>
            <form onSubmit={handleSubmit}>
                <AutoComplete />
                <AutoComplete />
                <AutoComplete />
                <AutoComplete />
                <AutoComplete />
                <Button disabled={selectedCourses.length === 0} type='submit' variant="outlined">Submit</Button>
            </form>
        </Container>
    )
}

export default Plan
