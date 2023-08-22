import { availableCourses } from '@/constants'
import { Autocomplete, TextField } from '@mui/material'
import React, { useState } from 'react'

interface AutoCompleteProps {
    courseArray: string[]
    setCourseArray: React.Dispatch<React.SetStateAction<string[]>>
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ courseArray, setCourseArray }) => {
    const [value, setValue] = useState<string | null>(null)

    return (
        <Autocomplete 
            value={value}
            onChange={(event, newValue, reason) => {
                if (reason ==='selectOption' && newValue) {
                    setCourseArray([...courseArray, newValue])
                } else if (reason === 'removeOption' || reason === 'clear') {
                    setCourseArray(courseArray.filter(course => course !== value))
                }
                setValue(newValue)
            }
            }
            options={availableCourses.filter(course => !courseArray.includes(course))}
            isOptionEqualToValue={(option, value) => option.valueOf === value.valueOf}
            sx = {{ width: 200}}
            renderInput={(params) => <TextField {...params} label="Course" />}
        />
    )
}

export default AutoComplete
