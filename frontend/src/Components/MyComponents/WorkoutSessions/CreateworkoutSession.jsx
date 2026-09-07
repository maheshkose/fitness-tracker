import React, { useEffect, useState } from "react";
import { useAppContext } from "@/Context/AppContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import useFormPersist from "@/hooks/useFormPersist";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { toast } from "sonner";
import DeletePopUp from "../DeletePopUp";
import { useWorkoutSessionContext } from "@/Context/WorkoutSessionContext";

const CreateworkoutSession = () => {
  const { getAllWorkoutPlans,createWorkoutSession } = useAppContext();
  const { showCreateWSF, setshowCreateWSF } = useWorkoutSessionContext();
  const initialState = {
    workoutPlans: [
      {
        _id: "",
        name: "",
        description: "",
        exercises: [
          {
            exerciseId: "",
            order: 1,
            sets: [
              {
                
                reps: 10,
                weight: 50,
                unit: "kg",
                restTime: 60,
                isDropSet: false,
                dropSet: { weight: 40, unit: "kg" },
                notes: "",
              },
            ],
          },
        ],
      },
    ],
    date: "",
    completed: false,
  };
  const createWorkoutPlan = () => ({
    name: "",
    description: "",
    exercises: [
      {
        exerciseId: "",
        order: 1,
        sets: [
          {
            reps: 10,
            weight: 50,
            unit: "kg",
            restTime: 60,
            isDropSet: false,
            dropSet: { weight: 40, unit: "kg" },
            notes: "",
          },
        ],
      },
    ],
  });

  const { form, setForm, resetState } = useFormPersist(
    "workoutSessionForm",
    initialState,
  );
  console.log("workoutSessionForm", form);

  const [workoutPlans, setworkoutPlans] = useState([]);
  const getAllWorkoutPlansHandler = async () => {
    const res = await getAllWorkoutPlans();
    setworkoutPlans(res.data.workoutPlans);
  };
  const createWorkoutSessionHandler = async () => {
    const res = await createWorkoutSession(form);
    if (res.data.success) {
      toast.success(res.data.message)
      resetState();
      setshowCreateWSF(false);
    } else {
      toast.error(res.data.message)
    }
  
  };
  useEffect(() => {
    getAllWorkoutPlansHandler();
  }, []);

  const formChangehandler = (e, index) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prev) => {
      const updatedWorkoutPlans = prev.workoutPlans.map((workoutPlan, i) => {
        if (i === index) {
          return {
            ...workoutPlan,
            [name]: value,
          };
        } else {
          return workoutPlan;
        }
      });
      return {
        ...prev,
        workoutPlans: updatedWorkoutPlans,
      };
    });
  };
  const handleRemoveSet = (e, wpIndex, exrIndex, setIndex) => {
    e.preventDefault();
    if (form.workoutPlans[wpIndex].exercises[exrIndex].sets.length === 1) {
      toast.error("Exercise must have one set");
      return;
    }
    setForm((prev) => {
      const updatedWorkoutPlans = prev.workoutPlans.map((wp, wpI) => {
        if (wpI === wpIndex) {
          const updatedExercise = wp.exercises.map((ex, exrI) => {
            if (exrI === exrIndex) {
              return {
                ...ex,
                sets: ex.sets.filter((set, setI) => setIndex !== setI),
              };
            } else {
              return ex;
            }
          });
          return {
            ...wp,
            exercises: updatedExercise,
          };
        } else {
          return wp;
        }
      });

      return {
        ...prev,
        workoutPlans: updatedWorkoutPlans,
      };
    });
  };
  const handleSetValueChange = (e, wpIndex, exrIndex, setIndex) => {
    const name = e.target.name;
    let value =
      e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
    console.log("value", value);
    if (value === "on") {
      value = true;
    }
    console.log("value", value);

    
    setForm((prev) => {
      const updatedWorkoutPlans = prev.workoutPlans.map((wp, wpI) => {
        if (wpI === wpIndex) {
          const updatedExercise = wp.exercises.map((ex, exrI) => {
            if (exrI === exrIndex) {
              const updatedSets = ex.sets.map((set, setI) => {
                return setI === setIndex ? { ...set, [name]: value } : set;
              });
              return { ...ex, sets: updatedSets };
            } else {
              return ex;
            }
          });
          return {
            ...wp,
            exercises: updatedExercise,
          };
        } else {
          return wp;
        }
      });

      return {
        ...prev,
        workoutPlans: updatedWorkoutPlans,
      };
    });
  };
  const removeWorkoutPlanFromForm = (e, i) => {
    setForm((prev) => {
      const updatedWorkoutPlans = prev.workoutPlans.filter(
        (wp, wpI) => wpI !== i,
      );
      console.log("updatedWorkoutPlans", updatedWorkoutPlans);

      return {
        ...prev,
        workoutPlans: updatedWorkoutPlans,
      };
    });
  };
  const getTargetReps = (reps)=>{
    console.log("getTargetReps");
    const r = reps;
    return r;
  }

  

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Log Workout Session</h3>
          <p className="text-sm text-muted-foreground">Capture your training details and save them for later review.</p>
        </div>
        <Button
          onClick={() => {
            setForm((prev) => ({
              ...prev,
              workoutPlans: [...prev.workoutPlans, createWorkoutPlan()],
            }));
          }}
        >
          Add workout plan
        </Button>
      </div>
          <div className="rounded-lg border border-dashed border-border/70 p-4 text-sm text-muted-foreground overflow-y-auto max-h-[400px]">
                {form.workoutPlans && form.workoutPlans.length >= 1 ? (
        <div className="grid gap-4 xl:grid-cols-2 ">
          {form.workoutPlans.map((workoutplan, index) => (
            <Card key={index} className="border-border/70 bg-background/80">
              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>Workout Plan {index + 1}</CardTitle>
                    <CardDescription>{workoutplan.name || 'Choose a saved workout plan'}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={(e) => removeWorkoutPlanFromForm(e, index)}>
                    Remove
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Workout Plan</Label>
                  <Select
                    value={workoutplan._id}
                    onValueChange={(value) => {
                      setForm((prev) => {
                        const updatedWorkoutPlans = prev.workoutPlans.map((workoutPlan, i) => {
                          if (index === i) {
                            return workoutPlans.find((wp) => value === wp._id) || workoutPlan;
                          }
                          return workoutPlan;
                        });
                        return { ...prev, workoutPlans: updatedWorkoutPlans };
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Workout Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {workoutPlans.map((plan, planIndex) => (
                          <SelectItem key={planIndex} value={plan._id}>
                            {plan.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Input
                    id={`description-${index}`}
                    placeholder="Plan notes"
                    name="description"
                    value={workoutplan.description}
                    onChange={(e) => formChangehandler(e, index)}
                  />
                </div>

                <div className="space-y-3">
                  {workoutplan.exercises && workoutplan.exercises.length >= 1 ? (
                    workoutplan.exercises.map((exr, exrI) => (
                      <div key={exrI} className="rounded-lg border border-border/70 bg-muted/20 p-4 overflow-y-auto max-h-[300px]J">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground">
                            Exercise: {exr.exerciseId?.name || 'Not selected'}
                          </p>
                          <span className="rounded-full bg-background/80 px-2.5 py-1 text-xs text-muted-foreground">
                            Order {exr.order}
                          </span>
                        </div>

                        {exr.sets.map((set, setI) => (
                          <div key={setI} className="mt-3 space-y-3 rounded-md border border-border/60 bg-background/70 p-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold text-foreground">Set {setI + 1}
                                <p>
                                  Rep Range: {set.repRange?.minReps} - {set.repRange?.maxReps} 
                                </p>
                              </h4>
                              <DeletePopUp actionhandler={(e) => handleRemoveSet(e, index, exrI, setI)} triggerLabel="Remove Set" message="Are you sure you want to remove this set?" />
                              
                            </div>

                            <div className="grid gap-3 md:grid-cols-2">
                              <div className="space-y-2">
                                <Label>Reps</Label>
                                <Input
                                  type="number"
                                  name="reps"
                                  value={set.reps}
                                  onChange={(e) => handleSetValueChange(e, index, exrI, setI)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Weight</Label>
                                <Input
                                  type="number"
                                  name="weight"
                                  value={set.weight}
                                  onChange={(e) => handleSetValueChange(e, index, exrI, setI)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Unit</Label>
                                <select
                                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                                  name="unit"
                                  value={set.unit}
                                  onChange={(e) => handleSetValueChange(e, index, exrI, setI)}
                                >
                                  <option value="kg">kg</option>
                                  <option value="lbs">lbs</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <Label>Rest time (sec)</Label>
                                <Input
                                  type="number"
                                  name="restTime"
                                  value={set.restTime}
                                  onChange={(e) => handleSetValueChange(e, index, exrI, setI)}
                                />
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 rounded-md bg-muted/40 p-3">
                              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                                <input
                                  type="checkbox"
                                  checked={set.isDropSet}
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    setForm((prev) => {
                                      const updatedWorkoutPlans = prev.workoutPlans.map((wp, wpI) => {
                                        if (index === wpI) {
                                          const updatedExercises = wp.exercises.map((ex, exIndex) => {
                                            if (exIndex === exrI) {
                                              const updatedSets = ex.sets.map((s, sIndex) =>
                                                sIndex === setI
                                                  ? {
                                                      ...s,
                                                      isDropSet: checked,
                                                      dropSet: checked ? { weight: 0, unit: 'kg' } : null,
                                                    }
                                                  : s,
                                              );
                                              return { ...ex, sets: updatedSets };
                                            }
                                            return ex;
                                          });
                                          return { ...wp, exercises: updatedExercises };
                                        }
                                        return wp;
                                      });
                                      return { ...prev, workoutPlans: updatedWorkoutPlans };
                                    });
                                  }}
                                  className="h-4 w-4 rounded border-border"
                                />
                                Drop set
                              </label>
                              <div className="space-y-2 flex-1">
                                <Label>Notes</Label>
                                <Input
                                  type="text"
                                  name="notes"
                                  value={set.notes}
                                  onChange={(e) => handleSetValueChange(e, index, exrI, setI)}
                                />
                              </div>
                            </div>

                            {set.isDropSet && (
                              <div className="grid gap-3 md:grid-cols-2">
                                <div className="space-y-2">
                                  <Label>Drop set weight</Label>
                                  <Input
                                    type="number"
                                    name="dropSetWeight"
                                    value={set.dropSet.weight}
                                    onChange={(e) => {
                                      setForm((prev) => {
                                        const updatedWorkoutPlans = prev.workoutPlans.map((wp, wpI) => {
                                          if (index === wpI) {
                                            const updatedExercises = wp.exercises.map((ex, exIndex) => {
                                              if (exIndex === exrI) {
                                                const updatedSets = ex.sets.map((s, sIndex) =>
                                                  sIndex === setI
                                                    ? {
                                                        ...s,
                                                        dropSet: { weight: e.target.value, unit: s.dropSet.unit },
                                                      }
                                                    : s,
                                                );
                                                return { ...ex, sets: updatedSets };
                                              }
                                              return ex;
                                            });
                                            return { ...wp, exercises: updatedExercises };
                                          }
                                          return wp;
                                        });
                                        return { ...prev, workoutPlans: updatedWorkoutPlans };
                                      });
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Drop set unit</Label>
                                  <select
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                                    name="dropSetUnit"
                                    value={set.dropSet.unit}
                                    onChange={(e) => {
                                      setForm((prev) => {
                                        const updatedWorkoutPlans = prev.workoutPlans.map((wp, wpI) => {
                                          if (index === wpI) {
                                            const updatedExercises = wp.exercises.map((ex, exIndex) => {
                                              if (exIndex === exrI) {
                                                const updatedSets = ex.sets.map((s, sIndex) =>
                                                  sIndex === setI
                                                    ? {
                                                        ...s,
                                                        dropSet: { weight: s.dropSet.weight, unit: e.target.value },
                                                      }
                                                    : s,
                                                );
                                                return { ...ex, sets: updatedSets };
                                              }
                                              return ex;
                                            });
                                            return { ...wp, exercises: updatedExercises };
                                          }
                                          return wp;
                                        });
                                        return { ...prev, workoutPlans: updatedWorkoutPlans };
                                      });
                                    }}
                                  >
                                    <option value="kg">kg</option>
                                    <option value="lbs">lbs</option>
                                  </select>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-md border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                      This plan does not contain any exercises yet.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
          Add a workout plan to begin building your session.
        </div>
      )}</div>

      <Card className="border-dashed border-border/70 bg-muted/20">
        <CardContent className="space-y-4 pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => {
                  setForm({
                    ...form,
                    date: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border/70 bg-background/80 p-3">
              <input
                type="checkbox"
                checked={form.completed}
                onChange={(e) => {
                  setForm({
                    ...form,
                    completed: e.target.checked,
                  });
                }}
                className="h-4 w-4 rounded border-border"
              />
              <Label className="mb-0">Mark as completed</Label>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={createWorkoutSessionHandler}>Log Workout</Button>
          </div>
        </CardContent>
      </Card>
    </div>

    // <div className="rounded-xl border border-border/60 bg-card p-3 shadow-sm">
    //   <div className="mb-3 flex items-center justify-between">
    //     <h2 className="text-base font-semibold text-foreground">New workout session</h2>
    //     <button
    //       type="button"
    //       onClick={() => setshowCreateWSF(false)}
    //       className="text-xs text-muted-foreground hover:text-foreground"
    //     >
    //       Close
    //     </button>
    //   </div>

    //   <form className="space-y-3">
    //     <div className="grid gap-3 md:grid-cols-2">
    //       <div className="space-y-1">
    //         <label className="text-[11px] font-medium text-muted-foreground">Session title</label>
    //         <input
    //           className="h-9 w-full rounded-md border border-border/70 bg-background px-2 text-sm outline-none ring-0 placeholder:text-muted-foreground"
    //           placeholder="Leg day"
    //         />
    //       </div>

    //       <div className="space-y-1">
    //         <label className="text-[11px] font-medium text-muted-foreground">Workout type</label>
    //         <input
    //           className="h-9 w-full rounded-md border border-border/70 bg-background px-2 text-sm outline-none ring-0 placeholder:text-muted-foreground"
    //           placeholder="Strength"
    //         />
    //       </div>

    //       <div className="space-y-1">
    //         <label className="text-[11px] font-medium text-muted-foreground">Duration</label>
    //         <input
    //           className="h-9 w-full rounded-md border border-border/70 bg-background px-2 text-sm outline-none ring-0 placeholder:text-muted-foreground"
    //           placeholder="45 min"
    //         />
    //       </div>

    //       <div className="space-y-1">
    //         <label className="text-[11px] font-medium text-muted-foreground">Calories</label>
    //         <input
    //           className="h-9 w-full rounded-md border border-border/70 bg-background px-2 text-sm outline-none ring-0 placeholder:text-muted-foreground"
    //           placeholder="420"
    //         />
    //       </div>
    //     </div>

    //     <div className="space-y-1">
    //       <label className="text-[11px] font-medium text-muted-foreground">Notes</label>
    //       <textarea
    //         rows={3}
    //         className="w-full rounded-md border border-border/70 bg-background px-2 py-2 text-sm outline-none ring-0 placeholder:text-muted-foreground"
    //         placeholder="What did you do?"
    //       />
    //     </div>

    //     <div className="flex justify-end gap-2 pt-1">
    //       <button
    //         type="button"
    //         onClick={() => setshowCreateWSF(false)}
    //         className="rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground hover:bg-muted"
    //       >
    //         Cancel
    //       </button>

    //       <button
    //         type="submit"
    //         className="rounded-md bg-cyan-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-cyan-500"
    //       >
    //         Save session
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default CreateworkoutSession;
