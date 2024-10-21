import { Course } from '@/types'
import { Autocomplete, FormControl, InputLabel, ListItemText, TextField } from '@mui/material'
import React, { useState } from 'react'

interface SearchBarProps {
    courses: Course[]
}

const getCourseOptionLabel = (course: Course) => {
    return `${course.subjectCode} ${course.catalogNumber}`
}

const SearchBar: React.FC<SearchBarProps> = ({courses}) => {
    const [selectedValue, setSelectedValue] = useState<Course | null>(null)
    const [inputValue, setInputValue] = useState<string>('')
    const [filteredOptions, setFilteredOptions] = useState<Course[]>([])
  
    const handleInputChange = (event: React.SyntheticEvent, newInputValue: string) => {
        setInputValue(newInputValue)
      
        if (newInputValue) {
            const filtered = courses.filter(course => 
                getCourseOptionLabel(course).toLowerCase().includes(newInputValue.toLowerCase())
            )
            setFilteredOptions(filtered.slice(0, 5)) // Limit to 5 options
        } else {
            setFilteredOptions([])
        }
    }

    const handleChange = (event: React.SyntheticEvent, newSelectedValue: Course | null) => {
        setSelectedValue(newSelectedValue)
    }
  
    return (<FormControl variant="outlined">
        <InputLabel
            style={{ display: inputValue ? 'none' : 'flex' }}>
            Search for courses
        </InputLabel>
      <Autocomplete
        options={filteredOptions}
        getOptionLabel={(course) => getCourseOptionLabel(course)}
        value={selectedValue}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        renderOption={(props, option) => (
            <li {...props} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
              <ListItemText
                primary={
                  <>
                    <span className="text-blue-500 mr-1">{option.subjectCode}</span>
                    <span className="font-bold text-black">{option.catalogNumber}</span>
                  </>
                }
              />
            </li>
          )}
        renderInput={(params) => (
          <TextField {...params} variant="filled"/>
        )}
        open={inputValue !== null && filteredOptions.length > 0}
        noOptionsText="No options"
      />
    </FormControl>
    )
  }
  
export default SearchBar
