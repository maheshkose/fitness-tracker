import React, { useState } from 'react'
import { createContext } from 'react'

const WorkoutSessionContext = createContext()

const WorkoutSessionProvider = ({ children }) => {
    const [showCreateWSF, setshowCreateWSF] = useState(false)
  return (
    <WorkoutSessionContext.Provider value={{ showCreateWSF, setshowCreateWSF }}>
      {children}
    </WorkoutSessionContext.Provider>
  )
}

export default WorkoutSessionProvider

export const useWorkoutSessionContext = () => {
    const context = React.useContext(WorkoutSessionContext);
    if (!context) {
      throw new Error("useWorkoutSessionContext must be used within a WorkoutSessionProvider");
    }
    return context;
  }
