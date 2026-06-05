import React, { useEffect, useState } from "react";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { useAppContext } from "@/Context/AppContext";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFormPersist from "@/hooks/useFormPersist";
import { Button } from "../ui/button";
import { toast } from "sonner";

const CreateworkoutSession = () => {
  const { getAllWorkoutPlans,createWorkoutSession } = useAppContext();
  const initialState = {
    workoutPlans: [
      {
        name: "",
        description: "",
        exercises: [
          {
            exerciseId: "",
            order: 1,
            sets: [
              {
                targetedReps:10,
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

  const { form, setForm, resetForm } = useFormPersist(
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
      resetForm();
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
      toast.error("Exrecise must have one set");
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
    // <div className='border-2'>
    //     <div className='border-2 flex gap-4 p-4'>
    //         <h2>Workoutplan</h2>
    //         <select name="workoutplan" id="" value={selectedWorkoutPlan} onChange={(e) => setselectedWorkoutPlan(e.target.value)}>
    //             <option value="" disabled={true}>Select workoutplan</option>
    //             {/* Map through workout plans and create options */
    //             workOutPlans.map((plan, index) => (
    //                 <option key={index} value={plan._id}>{plan.name}</option>
    //             ))
    //             }
    //         </select>
    //     </div>
    //     <div className='border-2 p-4'>
    //         <h2>Selected Workout Plan Details</h2>
    //         {selectedWorkoutPlan ? (
    //             <div>
    //                 <h3>{workOutPlans.find((plan,i)=>plan._id === selectedWorkoutPlan)?.name}</h3>
    //                 <p>{workOutPlans.find((plan,i)=>plan._id === selectedWorkoutPlan)?.description}</p>
    //                 <h4>Exercises:</h4>
    //                 <ul>
    //                     {workOutPlans.find((plan,i)=>plan._id === selectedWorkoutPlan)?.exercises?.map((exercise, index) => (
    //                         <li key={index}>
    //                             <strong>{exercise.exerciseId}</strong>
    //                             {
    //                               exercise.sets.map((set, setIndex) => (
    //                                 <div key={setIndex}>
    //                                   <div>sets: {setIndex + 1} -
    //                                   Reps: {set.reps}, Weight: {set.weight} {set.unit || 'kg'} {set.isDropSet ? `(Drop Set: ${set.dropSet.reps} reps at ${set.dropSet.weight} kg)` : ''}</div>
    //                                   <div>
    //                                     <form action="">
    //                                       set:{setIndex + 1} - Reps: <input type="number" name={`reps-${index}-${setIndex}`} defaultValue={set.reps} />
    //                                       Weight: <input type="number" name={`weight-${index}-${setIndex}`} defaultValue={set.weight} />
    //                                       note: <input type="text" name={`note-${index}-${setIndex}`} />
    //                                     </form>
    //                                   </div>
    //                                   <div className='flex gap-2'>
    //                                     <button className='bg-amber-400 p-2'>Enter Log</button>
    //                                     <button className='bg-red-500 p-2 text-white'>remove</button>
    //                                   </div>

    //                                 </div>
    //                               ))
    //                             }
    //                         </li>
    //                     ))}
    //                 </ul>
    //             </div>
    //         ) : (
    //             <p>Please select a workout plan.</p>
    //         )}
    //     </div>
    // </div>
    <div>
      <div>
        <FieldLegend>Log Workout Session</FieldLegend>
        <Button
          onClick={() => {
            setForm((prev) => {
              return {
                ...prev,
                workoutPlans: [...prev.workoutPlans, createWorkoutPlan()],
              };
            });
          }}
        >
          Add workout plan
        </Button>

        <div className="w-full h-auto flex flex-col lg:flex-row justify-between gap-4">
          {form.workoutPlans && form.workoutPlans.length >= 1 ? (
            form.workoutPlans.map((workoutplan, index) => (
              <div
                key={index}
                className="w-full flex flex-col  border-2 border-black dark:border-white"
              >
                <FieldGroup>
                  {/* add workout plan id if needed */}
                  <Field>
                    <FieldLabel>Select Workout Plan</FieldLabel>
                    <Select
                      value={workoutplan._id}
                      onValueChange={(value) => {
                        setForm((prev) => {
                          const updatedWorkoutPlans = prev.workoutPlans.map(
                            (workoutPlan, i) => {
                              if (index === i) {
                                const selectedWorkoutPlan = workoutPlans.find(
                                  (wp, wpi) => value === wp._id,
                                );
                                console.log(selectedWorkoutPlan);

                                return selectedWorkoutPlan;
                              } else {
                                return workoutPlan;
                              }
                            },
                          );
                          return {
                            ...prev,
                            workoutPlans: updatedWorkoutPlans,
                          };
                        });
                      }}
                    >
                      <SelectTrigger id="checkout-exp-month-ts6">
                        <SelectValue placeholder="Select Workout Plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {workoutPlans.map((plan, index) => (
                            <SelectItem key={index} value={plan._id}>
                              {plan.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <div>
                    <input
                      type="text"
                      placeholder="description"
                      name="description"
                      value={workoutplan.description}
                      onChange={(e) => {
                        formChangehandler(e, index);
                      }}
                    />
                  </div>

                  <div>
                    {workoutplan.exercises &&
                    workoutplan.exercises.length >= 1 ? (
                      workoutplan.exercises.map((exr, exrI) => {
                        return (
                          <div key={exrI}>
                            <p className="text-2xl text-red-400">
                              Exercise :{exr.exerciseId?.name || "not"}
                            </p>
                            <p>order : {exr.order}</p>
                            {exr.sets.map((set, setI) => (
                              <div key={setI}>
                                <h4>Set : {index + 1}</h4>
                                <div className="flex gap-2">
                                  <div>
                                    <label htmlFor="">Reps</label>
                                    <input
                                      type="number"
                                      name="reps"
                                      value={set.reps}
                                      onChange={(e) =>
                                        handleSetValueChange(e, index,exrI,setI)
                                      }
                                    />
                                  </div>
                                  <div>
                                    <label htmlFor="">Weight</label>
                                    <input
                                      type="number"
                                      name="weight"
                                      value={set.weight}
                                      onChange={(e) =>
                                        handleSetValueChange(e, index,exrI,setI)
                                      }
                                    />
                                  </div>
                                  <div>
                                    <label htmlFor="">Unit</label>
                                    <select
                                      name="unit"
                                      value={set.unit}
                                      onChange={(e) =>
                                        handleSetValueChange(e, index,exrI,setI)
                                      }
                                    >
                                      <option value="kg">kg</option>
                                      <option value="lbs">lbs</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label htmlFor="">
                                      Rest time in seconds
                                    </label>
                                    <input
                                      type="number"
                                      name="restTime"
                                      value={set.restTime}
                                      onChange={(e) =>
                                        handleSetValueChange(e, index,exrI,setI)
                                      }
                                    />
                                  </div>
                                  <div>
                                    <label htmlFor="">Is drop set</label>
                                    <input
                                      type="checkbox"
                                      name="isDropSet"
                                      checked={set.isDropSet}
                                      onChange={(e) => {
                                        const checked = e.target.checked;
                                        console.log("checked", checked);

                                        setForm((prev) => {
                                          const updatedWorkoutPlans =
                                            prev.workoutPlans.map((wp, wpI) => {
                                              if (index === wpI) {
                                                const updatedExercises =
                                                  wp.exercises.map(
                                                    (ex, exIndex) => {
                                                      if (exIndex === exrI) {
                                                        const updatedSets =
                                                          ex.sets.map(
                                                            (s, sIndex) =>
                                                              sIndex === setI
                                                                ? {
                                                                    ...s,
                                                                    isDropSet:
                                                                      checked,
                                                                    dropSet:
                                                                      checked
                                                                        ? {
                                                                            weight: 0,
                                                                            unit: "kg",
                                                                          }
                                                                        : null,
                                                                  }
                                                                : s,
                                                          );

                                                        return {
                                                          ...ex,
                                                          sets: updatedSets,
                                                        };
                                                      } else {
                                                        return ex;
                                                      }
                                                    },
                                                  );
                                                return {
                                                  ...wp,
                                                  exercises: updatedExercises,
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
                                      }}
                                    />
                                  </div>
                                  {set.isDropSet && (
                                    <div>
                                      <label htmlFor="">Drop set weight</label>
                                      <input
                                        type="number"
                                        name="dropSetWeight"
                                        value={set.dropSet.weight}
                                        onChange={(e) => {
                                          setForm((prev) => {
                                            const updatedWorkoutPlans =
                                              prev.workoutPlans.map(
                                                (wp, wpI) => {
                                                  if (index === wpI) {
                                                    const updatedExercises =
                                                      wp.exercises.map(
                                                        (ex, exIndex) => {
                                                          if (
                                                            exIndex === exrI
                                                          ) {
                                                            const updatedSets =
                                                              ex.sets.map(
                                                                (s, sIndex) =>
                                                                  sIndex ===
                                                                  setI
                                                                    ? {
                                                                        ...s,

                                                                        dropSet:
                                                                          {
                                                                            weight:
                                                                              e
                                                                                .target
                                                                                .value,
                                                                            unit: s
                                                                              .dropSet
                                                                              .unit,
                                                                          },
                                                                      }
                                                                    : s,
                                                              );

                                                            return {
                                                              ...ex,
                                                              sets: updatedSets,
                                                            };
                                                          } else {
                                                            return ex;
                                                          }
                                                        },
                                                      );
                                                    return {
                                                      ...wp,
                                                      exercises:
                                                        updatedExercises,
                                                    };
                                                  } else {
                                                    return wp;
                                                  }
                                                },
                                              );

                                            return {
                                              ...prev,
                                              workoutPlans: updatedWorkoutPlans,
                                            };
                                          });
                                        }}
                                      />
                                      <label htmlFor="">Drop set unit</label>
                                      <select
                                        name="dropSetUnit"
                                        value={set.dropSet.unit}
                                        //khsdfh
                                        onChange={(e) => {
                                          setForm((prev) => {
                                            const updatedWorkoutPlans =
                                              prev.workoutPlans.map(
                                                (wp, wpI) => {
                                                  if (index === wpI) {
                                                    const updatedExercises =
                                                      wp.exercises.map(
                                                        (ex, exIndex) => {
                                                          if (
                                                            exIndex === exrI
                                                          ) {
                                                            const updatedSets =
                                                              ex.sets.map(
                                                                (s, sIndex) =>
                                                                  sIndex ===
                                                                  setI
                                                                    ? {
                                                                        ...s,

                                                                        dropSet:
                                                                          {
                                                                            weight:
                                                                              s
                                                                                .dropSet
                                                                                .weight,
                                                                            unit: e
                                                                              .target
                                                                              .value,
                                                                          },
                                                                      }
                                                                    : s,
                                                              );

                                                            return {
                                                              ...ex,
                                                              sets: updatedSets,
                                                            };
                                                          } else {
                                                            return ex;
                                                          }
                                                        },
                                                      );
                                                    return {
                                                      ...wp,
                                                      exercises:
                                                        updatedExercises,
                                                    };
                                                  } else {
                                                    return wp;
                                                  }
                                                },
                                              );

                                            return {
                                              ...prev,
                                              workoutPlans: updatedWorkoutPlans,
                                            };
                                          });
                                        }}
                                        //jhgkjs
                                      >
                                        <option value="kg">kg</option>
                                        <option value="lbs">lbs</option>
                                      </select>
                                    </div>
                                  )}
                                  <div>
                                    <label htmlFor="">Notes</label>
                                    <input
                                      type="text"
                                      name="notes"
                                      value={set.notes}
                                      onChange={(e) =>
                                        handleSetValueChange(e, index,exrI,setI)
                                      }
                                    />
                                  </div>
                                </div>
                                <button
                                  onClick={(e) =>
                                    handleRemoveSet(e, index, exrI, setI)
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        );
                      })
                    ) : (
                      <p>this plan does not contain any exercises</p>
                    )}
                  </div>
                  <div>
                    <Button
                      onClick={(e) => {
                        removeWorkoutPlanFromForm(e, index);
                      }}
                    >
                      Remove Plan
                    </Button>
                  </div>
                </FieldGroup>
                <h1>{workoutplan.name}</h1>
              </div>
            ))
          ) : (
            <p>please add workout plan</p>
          )}
        </div>

        {/* //date and is completed */}
        <div>
          <FieldLabel>Date </FieldLabel>
          <input
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
        <div>
          <FieldLabel>Is completed </FieldLabel>
          <input
            type="checkbox"
            checked={form.completed}
            onChange={(e) => {
              setForm({
                ...form,
                completed: e.target.checked,
              });
            }}
          />
        </div>

        <Button onClick={createWorkoutSessionHandler




  
        }>Log Workout</Button>
      </div>
    </div>
  );
};

export default CreateworkoutSession;
