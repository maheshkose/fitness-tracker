import React from 'react'
import { Routes,Route } from "react-router-dom"
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Metrics from './Pages/Metrics'
import Profile from './Pages/Profile'
import Progress from './Pages/Progress'
import WorkoutPlans from './Pages/WorkoutPlans'
import WorkoutSession from './Pages/WorkoutSession'
import ExerciseManager from './Components/MyComponents/Exercise/Exercise'
import WorkoutPlanDetails from './Pages/WorkoutPlanDetails'
import ExerciseDetails from './Components/MyComponents/Exercise/ExerciseDetails'
const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/Metrics' element={<Metrics/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/Progress' element={<Progress/>}/>
        <Route path='/WorkoutPlans' element={<WorkoutPlans/>}/>
        <Route path='/WorkoutPlanDetails/:id' element={<WorkoutPlanDetails/>}/>
        
        <Route path='/WorkoutSession' element={<WorkoutSession/>}/>
        <Route path='/ExerciseDetails/:id' element={<ExerciseDetails/>}/>
        <Route path='/Exercise' element={<ExerciseManager/>}/>

    
        <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default AppRoutes