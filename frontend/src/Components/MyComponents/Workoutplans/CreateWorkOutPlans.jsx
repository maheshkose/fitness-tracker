import { useAppContext } from "@/Context/AppContext";
import React, { useEffect, useRef } from "react";
import SelectExercise from "./SelectExercise";
import { toast } from "sonner";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import useFormPersist from "@/hooks/useFormPersist";
// import { Select } from "radix-ui";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Delete } from "lucide-react";
import DeletePopUp from "../DeletePopUp";

const CreateWorkOutPlans = ({ getAllWorkoutPlansHandler, setShowForm, isEditWorkoutPlan, workoutPlan, id }) => {

  console.log("isEditWorkoutPlan", isEditWorkoutPlan);
  const { createWorkoutPlan, updateWorkoutPlanById, getWorkoutPlanById } = useAppContext();

  const createExercise = () => ({
    exerciseName: "",
    exerciseId: "",
    order: 1,
    sets: [
      {
        repRange: { minReps: 1, maxReps: 12 },
        weight: 50,
        unit: "kg",
        restTime: 60,
        isDropSet: false,
        dropSet: { weight: 40, unit: "kg" },
        notes: "",
      },
    ],
  });

  const { form, setForm, resetState } = useFormPersist("workoutPlanForm", {
    name: "",
    access: "",
    description: "",
    exercises: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateWorkoutPlan = async () => {
    if (!form.name || form.name.trim() === "") {
      toast.error("Workout plan name is required for creating a workout plan");
      return;
    }
    const res = await createWorkoutPlan(form);
    if (res.data.success) {
      toast.success(res.data.message);
      resetState();
      getAllWorkoutPlansHandler();
      setShowForm(false);
    } else {
      toast.error(res.data.message);
    }
  };

  const handleUpdateWorkoutPlanById = async () => {
    const res = await updateWorkoutPlanById(id, form);
    if (res.data.success) {
      toast.success(res.data.message);
      resetState();
      setShowForm(false);
      getAllWorkoutPlansHandler();
      ;
    } else {
      toast.error(res.data.message);
    }
  };

  const getWorkoutPlanHandler = async () => {

    const res = await getWorkoutPlanById(id)
    if (res?.data?.success) {
      setForm(
        {
          name: res.data.workoutPlan.name,
          description: res.data.workoutPlan.description,
          exercises: res.data.workoutPlan.exercises.map((ex) => ({
            exerciseId: ex.exerciseId._id,
            exerciseName: ex.exerciseId.name,
            order: ex.order,
            sets: ex.sets.map((set) => ({
              repRange: set.repRange || { minReps: 1, maxReps: 12 },
              weight: set.weight,
              unit: set.unit,
              restTime: set.restTime,
              isDropSet: set.isDropSet,
              dropSet: set.dropSet,
              notes: set.notes,
            }))
          }))
        }
      )
    } else {
      toast.error(res?.data?.message || 'Failed to load workout plan')
    }
  }

  console.log("form", form)
  useEffect(() => {
    if (isEditWorkoutPlan) {
      getWorkoutPlanHandler();
      // setForm({name: workoutPlan.name, description: workoutPlan.description, exercises: workoutPlan.exercises})
    }
  }, []);
  const bottomRef = useRef(null);

  const scrollbottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <Card className="border-border/60 bg-card/80">
      <CardHeader>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-xl">Create a workout plan</CardTitle>
            <CardDescription>
              Compose your training template and add exercises with sets and reps.
            </CardDescription>
          </div>
          <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {form.exercises.length} exercise{form.exercises.length === 1 ? "" : "s"}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium">Plan name</span>
            <Input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Upper body strength"
              required
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium">Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Add a short overview of the plan"
              className="min-h-24 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </label>
          <Select value={form.access} onValueChange={(value) => {
            setForm((prev) => {
              return {
                ...prev,
                access: value
              }
            })
          }}>
            <SelectTrigger className="w-full rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50">
              <SelectValue placeholder="select access" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {["isPrivate", "isPublic"].map((item, i) => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
                {/* <SelectItem value={"isGloabal"}>{isGloabal}</SelectItem> */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Exercises</h2>
            <Button
              type="button"
              variant="outline"

            >
              {form.exercises.length}
            </Button>
          </div>

          <div className="space-y-4">
            {form.exercises.map((exe, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between" ref={form.exercises.length - 1 === index ? bottomRef : null}>
                  <p className="font-medium">Exercise {index + 1}</p>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Custom block
                  </span>
                </div>

                <SelectExercise form={form} setForm={setForm} i={index} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              setForm((prev) => ({
                ...prev,
                exercises: [...prev.exercises, createExercise()],
              }));
              scrollbottom(); 
            }}
          >
            Add exercise
          </Button>
          <DeletePopUp actionHandler={resetState} triggerLabel="Reset form" message="Are you sure you want to reset the form? All unsaved changes will be lost." />
          {!isEditWorkoutPlan ? <Button onClick={handleCreateWorkoutPlan}>Add workout plan</Button> :
            <Button onClick={() => handleUpdateWorkoutPlanById()}>Update workout plan</Button>}
        </div>
      </CardContent>

    </Card>
  );
};

export default CreateWorkOutPlans;
