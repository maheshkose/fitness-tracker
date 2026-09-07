import { useAppContext } from '@/Context/AppContext'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../Components/ui/button'
import { ChevronLeft, Clock3, Dumbbell, ListChecks } from 'lucide-react'
import CreateWorkOutPlans from '@/Components/MyComponents/Workoutplans/CreateWorkOutPlans'

const WorkoutPlanDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getWorkoutPlanById } = useAppContext()
  const [workoutPlan, setWorkoutPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEdit, setIsEdit] = useState(false)

  const getWorkoutPlanHandler = async () => {
    try {
      setLoading(true)
      const res = await getWorkoutPlanById(id)
      if (res?.data?.success) {
        setWorkoutPlan(res.data.workoutPlan)
      } else {
        toast.error(res?.data?.message || 'Failed to load workout plan')
      }
    } catch (err) {
      toast.error('Failed to load workout plan')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getWorkoutPlanHandler()
  }, [id])

  return (
    <>
   
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted"
              aria-label="Back"
            >
              <ChevronLeft size={18} />
            </button>
            <div>
              <h1 className="text-2xl font-semibold">Workout Plan</h1>
              <p className="text-sm text-muted-foreground">Plan details and exercises</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-full" onClick={() => setIsEdit((prev) => !prev)}>
              {isEdit ? 'Cancel Edit' : 'Edit'}
            </Button>
            <Button className="rounded-full bg-emerald-500 hover:bg-emerald-600">
              <Dumbbell size={14} className="mr-2" />
              Start
            </Button>
          </div>
        </div>
        <div className="rounded-[20px] border border-border/70 bg-card/85 p-6 shadow-sm">
         {isEdit && <CreateWorkOutPlans getAllWorkoutPlansHandler={getWorkoutPlanHandler} setShowForm={setIsEdit} isEditWorkoutPlan={isEdit} workoutPlan={workoutPlan} id={id} />}
        </div>

        <div className="rounded-[20px] border border-border/70 bg-card/85 p-6 shadow-sm">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-6 w-3/4 rounded bg-muted mb-4" />
              <div className="h-4 w-1/2 rounded bg-muted" />
            </div>
          ) : !workoutPlan ? (
            <div className="py-6 text-center text-sm text-muted-foreground">No workout plan found.</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold">{workoutPlan.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{workoutPlan.description}</p>

                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-medium">Exercises</h3>
                  <div className="grid gap-3">
                    {(workoutPlan.exercises || []).map((exercise, idx) => (
                      <div key={idx} className="rounded-lg border border-border/60 bg-background/40 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-3">
                              <div className="rounded-md bg-emerald-500/10 p-2 text-emerald-600">
                                <ListChecks size={16} />
                              </div>
                              <div>
                                <p className="font-medium">{exercise.exerciseId?.name || 'Unnamed'}</p>
                                <p className="text-sm text-muted-foreground">Order: {exercise.order}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">{exercise.duration || ''}</div>
                        </div>

                        <div className="mt-3 space-y-2">
                          {(exercise.sets || []).map((set, sIdx) => (
                            <div key={sIdx} className="flex items-center justify-between rounded-md bg-card/40 px-3 py-2">
                              <div>
                                <p className="text-sm font-medium">Set {sIdx + 1}</p>
                                <p className="text-xs text-muted-foreground">{set.reps} reps • {set.weight} {set.unit}</p>
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center gap-2">
                                <Clock3 size={14} />
                                {set.restTime}s
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="rounded-lg border border-border/60 bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">Created by</p>
                <p className="mt-1 font-medium">{workoutPlan.userId?.name || 'Unknown'}</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Exercises</span>
                    <span className="font-semibold">{(workoutPlan.exercises || []).length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Estimated time</span>
                    <span className="font-semibold">{workoutPlan.estimatedTime || '—'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Difficulty</span>
                    <span className="font-semibold">{workoutPlan.difficulty || '—'}</span>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default WorkoutPlanDetails