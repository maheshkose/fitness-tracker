import DeletePopUp from "@/Components/MyComponents/DeletePopUp";
import CreateWorkOutPlans from "@/Components/MyComponents/Workoutplans/CreateWorkOutPlans";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { useAppContext } from "@/Context/AppContext";
import { Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const WorkoutPlans = () => {
  const router = useNavigate();
  const { getAllWorkoutPlans, deleteWorkoutPlanById } = useAppContext();
  const [editingId, setEditingId] = useState(null);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);


  const getAllWorkoutPlansHandler = async () => {
    try {
      setLoading(true);
      const res = await getAllWorkoutPlans();
      setWorkoutPlans(res?.data?.workoutPlans ?? []);
    } finally {
      setLoading(false);
    }
  };
  const deleteWorkoutPlanByIdHandler = async (id) => {
    try {
      setLoading(true)
      const res = await deleteWorkoutPlanById(id)
      if (res?.data?.success) {
        toast.success(res.data.message)
        getAllWorkoutPlansHandler()
      } else {
        toast.error(res?.data?.message || 'Failed to delete workout plan')
      }
    } catch (err) {
      toast.error('Failed to delete workout plan')
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    getAllWorkoutPlansHandler();
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Training hub
            </p>
            <h1 className="text-3xl font-semibold text-foreground">
              Workout Plans
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Build structured routines and keep your training sessions organized in one place.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="rounded-full bg-cyan-600 px-5 text-sm font-medium text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
            >
              {showForm ? 'Close form' : 'Add plan'}
            </Button>

          </div>
        </div>
        {showForm && (
          <div className="w-full">
            <CreateWorkOutPlans getAllWorkoutPlansHandler={getAllWorkoutPlansHandler} setShowForm={setShowForm} />
          </div>
        )}


        <Card className="border-border/60 bg-card/80">
          <CardHeader>
            <CardTitle className="text-xl">Your saved plans</CardTitle>
            <CardDescription>
              Review, edit, or remove your existing workout templates.
            </CardDescription>
            <div className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-sm text-muted-foreground">
              {loading ? "Loading..." : `${workoutPlans.length} plan${workoutPlans.length === 1 ? "" : "s"}`}
            </div>
          </CardHeader>
          <CardContent className="space-y-3 ">
            {loading ? (
              <div className="rounded-xl border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
                Loading your workout plans…
              </div>
            ) : workoutPlans.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
                No workout plans yet. Create your first plan above.
              </div>
            ) : (
              workoutPlans.map((workoutPlan, index) => (
                <div
                  key={workoutPlan._id || index}
                  className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm md:flex-row md:items-center md:justify-between"

                >
                  <div onClick={() => { router(`/WorkoutPlanDetails/${workoutPlan._id}`); }} className="cursor-pointer" >

                    <div className="flex items-start gap-2">
                      <Sparkles className="mt-1 h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-400" />
                      <div className="min-w-0">
                        <h4 className="truncate text-lg font-semibold text-slate-900 dark:text-slate-50">{workoutPlan.name}</h4>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {workoutPlan?.access}
                        </p>
                      </div>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {workoutPlan.description || "No description added yet."}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {
                      workoutPlan.access === "isPrivate" ?
                        <Button
                          variant="outline"
                          onClick={() => { setEditingId(workoutPlan._id); router(`/WorkoutPlanDetails/${workoutPlan._id}`); }}
                        >
                          Edit
                        </Button> : <Button
                          variant="outline"
                          onClick={() => { setEditingId(workoutPlan._id); router(`/WorkoutPlanDetails/${workoutPlan._id}`); }}
                        >
                          Use
                        </Button>
                    }
                    <DeletePopUp actionHandler={() => deleteWorkoutPlanByIdHandler(workoutPlan._id)} />

                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkoutPlans;
