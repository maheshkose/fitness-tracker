import React, { createContext, useContext } from 'react'

const DashboardContext = createContext();
const DashBoardContextProvider = ({children}) => {

  return (
    <DashboardContext.Provider value={{}}>{children}</DashboardContext.Provider>
  )
}

export default DashBoardContextProvider

export const useDashboardContext = ()=>{
   const context = React.useContext(DashboardContext);
       if (!context) {
         throw new Error("useWorkoutSessionContext must be used within a WorkoutSessionProvider");
       }
       return context;
}