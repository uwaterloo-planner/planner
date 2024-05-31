import React, { createContext, useContext, useState } from 'react'

interface CoursesContextType {
    selectedCourses: string[]
    setSelectedCourses: React.Dispatch<React.SetStateAction<string[]>>
}

interface CoursesProviderProps {
    children: React.ReactNode
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined)

export const useCoursesContext = () => {
  const context = useContext(CoursesContext)
  if (!context) {
    throw new Error('useCoursesContext must be used within a MyProvider')
  }
  return context
}

export const CoursesProvider: React.FC<CoursesProviderProps> = ({ children }) => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])

  return (
    <CoursesContext.Provider value={{ selectedCourses, setSelectedCourses}}>
      {children}
    </CoursesContext.Provider>
  )
}
