import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useAppContext } from '@/Context/AppContext'
import { StrengthProgressAreaCharts } from '../AreaCharts'
import { StrengthBarChart } from '../BarCharts'

const WorkoutPlanProgress = ({ planId = '6a6dc0ab9d0b4ffaa1e8b698' }) => {
  const { progressOfWorkoutPlan } = useAppContext()
  const [workoutSessions, setWorkoutSessions] = useState([])
  const [exercisedata, setexercisedata] = useState([])
  const [workouty, setworkouty] = useState({
    _id: "",  
    name: "",
    instances: [
      {
        date: 'jul,1,2026',
        exercises: []

      }
    ]
  })
  // const [planName, setPlanName] = useState('pull day')
  const [isLoading, setIsLoading] = useState(false)

  const progressOfWorkoutPlanHandler = async () => {
    setIsLoading(true)
    const res = await progressOfWorkoutPlan(planId)
    setIsLoading(false)

    if (res?.data?.success) {
      toast.success(res.data.message)
      setWorkoutSessions(res.data.p || [])
    } else {
      toast.error(res?.data?.message || 'Unable to load workout plan progress')
    }
  }

  const exampleData = [
    {
      exerciseId: 'exercise1',
      exerciseName: 'Bench Press',
      sets: [
        [
          { date: 'jul,1,2026', weight: 60, reps: 10, repRange: { minReps: 1, maxReps: 12 }, unit: 'kg' },
          { date: 'jul,7,2026', weight: 90, reps: 10, repRange: { minReps: 1, maxReps: 12 }, unit: 'kg' },
        ],
        [
          { date: 'jul,1,2026', weight: 60, reps: 10, repRange: { minReps: 1, maxReps: 12 }, unit: 'kg' },
          { date: 'jul,7,2026', weight: 90, reps: 10, repRange: { minReps: 1, maxReps: 12 }, unit: 'kg' },
        ]
      ]
    }
  ]


  let workoutPs = [

  ]

  function fn(array) {
    const exerciseData = []
    for (let i = 0; i < array.length; i++) {
      let obj = array[i];

      if (i === 0) {
        for (let j = 0; j < obj.exercises.length; j++) {
          let exercise = obj.exercises[j];

          exerciseData.push({
            exerciseId: exercise.exerciseId,
            exerciseName: exercise.exerciseId.name,
            sets: exercise.sets.map((set) => ([{
              ...set,
            }]))
          });
        }
      } else {
        for (let j = 0; j < obj.exercises.length; j++) {
          let exercise = obj.exercises[j];
          //if the exercise already exists in the exerciseData array, push the sets to the existing exercise
          let existingExercise = exerciseData.find((ex) => ex.exerciseName === exercise.exerciseId.name);
          if (existingExercise) {
            for (let k = 0; k < existingExercise.sets.length; k++) {
              existingExercise.sets[k].push({ ...exercise.sets[k] });
            }
          }
        }
      }
    }
    setexercisedata(exerciseData);
  }


  const wp = () => {

    const workoutP = workoutSessions.map((session) => {
      const plan = session.workoutPlans.find((workoutPlan) => workoutPlan._id === planId)
      if (!plan) {
        return
        null;
      }



      return {
        _id: plan._id,
        name: plan.name,
        instance:
        {
          date: session.date,
          exercises: plan.exercises.map((exercise) => {
            return {
              ...exercise, sets: exercise.sets.map((set) => {
                return {
                  ...set,
                   date: new Date(session.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                }
              })
            }
          })
        }

      }
    })

    return {
      _id: workoutP[0]?._id || planId,
      name: workoutP[0]?.name ,
      instances: workoutP.map((wp) => wp.instance).filter((instance) => instance !== null)
    }
  }






  // const chartData = useMemo(() => {
  //   if (!workoutSessions || workoutSessions.length === 0) {
  //     return []
  //   }

  //   return workoutSessions
  //     .map((session) => {
  //       const plan = session.workoutPlans?.find(
  //         (workoutPlan) => workoutPlan.name?.toLowerCase() === planName.toLowerCase(),
  //       )

  //       if (!plan) {
  //         return null
  //       }

  //       const exerciseMaxWeights = (plan.exercises || []).map((exercise) => {
  //         const weights = (exercise.sets || []).map((set) => set.weight || 0)
  //         return weights.length ? Math.max(...weights) : 0
  //       })

  //       const totalMaxWeight = exerciseMaxWeights.reduce((sum, value) => sum + value, 0)
  //       const formattedDate = new Date(session.date).toLocaleDateString('en-US', {
  //         month: 'short',
  //         day: 'numeric',
  //       })

  //       return {
  //         date: formattedDate,
  //         desktop: totalMaxWeight,
  //         exercises: plan.exercises || [],
  //       }
  //     })
  //     .filter(Boolean)
  // }, [workoutSessions])

  useEffect(() => {
    progressOfWorkoutPlanHandler();
  }, [])

  useEffect(() => {
    const workoutPlanData = wp();
    setworkouty(workoutPlanData);
  }, [workoutSessions]);
  useEffect(() => {
    fn(workouty.instances || []);
  }, [workouty]);

  console.log('workouty', workouty);
  console.log('exercisedata', exercisedata);


  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Workout Plan Progress {workouty.name}</h2>
        <p className="text-sm text-muted-foreground">
          Showing progress for the <strong>{workouty.name}</strong> workout plan.
        </p>
      </div>

      {isLoading ? (
        <div>Loading workout progress...</div>
      ) : exercisedata.length === 0 ? (
        <div>No progress data available for this workout plan yet.</div>
      ) : (

        <div>

        </div>
        // workouty.instances?.map((instance, index) => (
        //   <div key={index} className="space-y-4">

        //   </div>
        // ))
      )}

      {
        exercisedata.length > 0 && (
          <div className="space-y-4">
            {exercisedata.map((exercise, index) => (
              <div key={index} className="space-y-2">
                {/* <h4 className="text-md font-medium">{exercise.exerciseName}</h4> */}
                <StrengthBarChart exercise={exercise} />
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}

export default WorkoutPlanProgress