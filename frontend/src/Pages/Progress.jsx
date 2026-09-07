import WorkoutPlanProgress from '@/Components/MyComponents/Progress/WorkoutPlanProgress'
import { useAppContext } from '@/Context/AppContext'
import { Weight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const Progress = () => {

  const { getAllWorkoutPlanUsedByUser } = useAppContext();
  const [AllWorkoutPlanUsedByUser, setAllWorkoutPlanUsedByUser] = useState([])

  const getAllWorkoutPlanUsedByUserHandler = async () => {
    const res = await getAllWorkoutPlanUsedByUser()
    if (res?.data?.success) {
      setAllWorkoutPlanUsedByUser(res.data.workoutPlans)
      toast.success(res.data.message)
    }else{
      toast.error(res?.data?.message || 'Unable to load workout plans')
    }
  }

  useEffect(() => {
    getAllWorkoutPlanUsedByUserHandler()
  }, [])
  console.log(' AllWorkoutPlanUsedByUser', AllWorkoutPlanUsedByUser);
  
  const data = [
    {name:"sqaut",sets:[{weight:90,reps:5,unit:"kg"},{weight:90,reps:4,unit:"kg"},{weight:90,reps:4,unit:"kg"}]}
  ]
  return (
    <div>Progress

      <div className='flex flex-col md:flex-row gap-4'>
        {AllWorkoutPlanUsedByUser.map((planId) => (
          <div key={planId} className='w-[50] h-[50] border p-4 rounded-lg'>
            
            <WorkoutPlanProgress planId={planId} />
          </div>
        ))}
      </div>
    </div>
  )
}
      


export default Progress