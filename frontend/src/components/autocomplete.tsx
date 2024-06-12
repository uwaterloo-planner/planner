import React, { useState } from 'react'
import { Autocomplete, AutocompleteChangeReason, TextField } from '@mui/material'
import { useCoursesContext } from '@/pages/plan/context'
import { getCourseName } from '@/utils'
import { Course } from '@/types'

interface AutoCompleteProps {
    availableCourses: Course[]
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ availableCourses }) => {
    const [selectedValue, setSelectedValue] = useState<Course | null>(null)
    const { selectedCourses, setSelectedCourses } = useCoursesContext()

    const handleChange = (e: React.SyntheticEvent, newValue: Course | null, reason: AutocompleteChangeReason) => {
        if (newValue && reason ==='selectOption') {
            setSelectedCourses(prevSelectedCourses => [...prevSelectedCourses, newValue])
        } else if (reason === 'removeOption' || reason === 'clear' || (selectedValue && availableCourses.includes(selectedValue))) {
            setSelectedCourses(prevSelectedCourses => prevSelectedCourses.filter(course => course.courseId !== selectedValue?.catalogNumber))
        }

        setSelectedValue(newValue)
    }

    return (
        <Autocomplete 
            value={selectedValue}
            onChange={handleChange}
            options={
                availableCourses
                    .filter(course => !selectedCourses.includes(course) || course === selectedValue)
            }
            isOptionEqualToValue={(option, value) => option.valueOf === value.valueOf}
            renderInput={(params) => <TextField {...params} label="Course" />}
            getOptionLabel={(course) => getCourseName(course)}
        />
    )
}

export default AutoComplete
