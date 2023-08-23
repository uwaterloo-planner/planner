import AutoComplete from "@/components/autocomplete"
import axios from 'axios'
import { PLAN_ENDPOINT, availableCoursesMap } from "@/constants"
import { Button, Container, Typography } from "@mui/material"
import React, { useState } from "react"

const Plan: React.FC = () => {
    const [courseArray, setCourseArray] = useState<string[]>([])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
     
        const mappedCourseIds = courseArray.map((course) => availableCoursesMap[course])
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
                <AutoComplete courseArray={courseArray} setCourseArray={setCourseArray}/>
                <AutoComplete courseArray={courseArray} setCourseArray={setCourseArray}/>
                <AutoComplete courseArray={courseArray} setCourseArray={setCourseArray}/>
                <AutoComplete courseArray={courseArray} setCourseArray={setCourseArray}/>
                <AutoComplete courseArray={courseArray} setCourseArray={setCourseArray}/>
                <Button disabled={courseArray.length === 0} type='submit' variant="outlined">Submit</Button>
            </form>
        </Container>
    )
}

export default Plan
