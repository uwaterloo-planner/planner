import { availableCourses } from '@/constants'
import { useCoursesContext } from '@/pages/plan/context'
import { Autocomplete, AutocompleteChangeReason, TextField } from '@mui/material'
import React, { useState } from 'react'

const AutoComplete: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null)
    const { selectedCourses, setSelectedCourses } = useCoursesContext()

    const handleChange = (e: React.SyntheticEvent, newValue: string | null, reason: AutocompleteChangeReason) => {
        e.preventDefault()

        if (newValue && reason ==='selectOption') {
            setSelectedCourses(prevSelectedCourses => [...prevSelectedCourses, newValue])
        }
        if (reason === 'removeOption' || reason === 'clear' || (selectedValue && availableCourses.includes(selectedValue))) {
            setSelectedCourses(prevSelectedCourses => prevSelectedCourses.filter(course => course !== selectedValue))
        }

        setSelectedValue(newValue)
    }

    return (
        <Autocomplete 
            value={selectedValue}
            onChange={handleChange}
            options={availableCourses.filter(course => !selectedCourses.includes(course))}
            isOptionEqualToValue={(option, value) => option.valueOf === value.valueOf}
            sx = {{ width: 200}}
            renderInput={(params) => <TextField {...params} label="Course" />}
        />
    )
}

export default AutoComplete
