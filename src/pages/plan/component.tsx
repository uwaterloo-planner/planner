import AutoComplete from "@/components/autocomplete"
import { availableCoursesMap } from "@/constants"
import { Button, Container, Typography } from "@mui/material"
import React, { useState } from "react"

const Plan: React.FC = () => {
    const [courseArray, setCourseArray] = useState<string[]>([])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
     
        const mappedCourseIds = courseArray.map((course) => availableCoursesMap[course])
        const courseQuery = mappedCourseIds.join(',')

        const endpoint = `/api/plan?course=${courseQuery}`
     
        const options = {
            method: 'GET',
            // param: {
            //     course: courseQuery
            // }
        }
        console.log(options)
        const response = await fetch(endpoint, options)
        
        const result = await response.json()
        console.log(result)
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
                <Button type='submit' variant="outlined">Submit</Button>
            </form>
        </Container>
    )
}

export default Plan
