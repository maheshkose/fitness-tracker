import { useAppContext } from "@/Context/AppContext";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const SelectExercise = ({ form, setForm, i }) => {
  //scroll to bottom
  const bottomRef = useRef(null);
  const scrollbottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };
  //fetching all exercises for dropdown
  const { getAllExercises } = useAppContext();
  const [exercises, setexercises] = useState([]);
  const getAllExercisesHandler = async () => {
    const res = await getAllExercises();
    setexercises(res.data.exercises);
  };
  useEffect(() => {
    getAllExercisesHandler();
  }, []);

  //selecting exercise from dropdown and setting exercise name and id in state
  const handleExerciseChange = (e, i) => {
    const selectedExerciseId = e.target.value;
    const selectedExercise = exercises.find(
      (ex) => ex._id === selectedExerciseId,
    );
    console.log("selectedExercise", selectedExercise);

    setForm((prev) => {
      const updatedExercises = prev.exercises.map((ex, index) => {
        if (index === i) {
          return {
            ...ex,
            exerciseName: selectedExercise.name,
            exerciseId: selectedExerciseId,
          };
        } else {
          return ex;
        }
      });
      return {
        ...prev,
        exercises: updatedExercises,
      };
    });
  };
  const [exerciseDetails, setexerciseDetails] = useState({
    exerciseId: "",
    order: 1,
    sets: [],
  });
  const [setDetails, setsetDetails] = useState({
    reps: 10,
    weight: 50,
    unit: "kg",
    restTime: 60,
    isDropSet: false,
    dropSet: { weight: 40, unit: "kg" },
    notes: "",
    //videoUrl: "",
  });

  const handleAddSet = (e) => {
    e.preventDefault();
    setForm((prev) => {
      const updatedExercises = prev.exercises.map((ex, index) => {
        if (i === index) {
          return {
            ...ex,
            sets: [...ex.sets, createSet()],
          };
        } else {
          return ex;
        }
      });

      return { ...prev, exercises: updatedExercises };
    });
    scrollbottom();
  };

  const handleRemoveSet = (e, idx) => {
    e.preventDefault();
    if (form.exercises[i].sets.length === 1) {
      toast.error("Exrecise must have one set");
      return;
    }
    setForm((prev) => {
      const updatedExercise = prev.exercises.map((ex, index) => {
        if (i === index) {
          return {
            ...ex,
            sets: ex.sets.filter((set, indx) => idx !== indx),
          };
        } else {
          return ex;
        }
      });
      return {
        ...prev,
        exercises: updatedExercise,
      };
    });
  };
  const handleSetValueChange = (e, idx) => {
    const name = e.target.name;
    let value =
      e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
    console.log("value", value);
    if (value === "on") {
      value = true;
    }
    console.log("value", value);

    setForm((prev) => {
      const updatedExercises = prev.exercises.map((ex, index) => {
        if (i === index) {
          const updatedSets = ex.sets.map((set, sIndex) => {
            return idx === sIndex ? { ...set, [name]: value } : set;
          });
          return { ...ex, sets: updatedSets };
        } else {
          return ex;
        }
      });
      return {
        ...prev,
        exercises: updatedExercises,
      };
    });
  };

  // sets logic

  const createSet = () => ({
    reps: 10,
    weight: 50,
    unit: "kg",
    restTime: 60,
    isDropSet: false,
    dropSet: { weight: 40, unit: "kg" },
    notes: "",
    //videoUrl: "",
  });

  console.log("form", form);

  return (
    <div className=" ">
      <div className="">
        <div>
          <label htmlFor="">Exercise Name</label>
          <br />
          <select
            name="exerciseId"
            id=""
            onChange={(e) => {
              handleExerciseChange(e, i);
            }}
            required
          >
            <option value="" disabled={true}>
              Select exercise
            </option>
            {exercises?.map((exercise) => (
              <option value={exercise._id} key={exercise._id}>
                {exercise.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="order">Order</label>
          <input
            type="number"
            name="order"
            value={form.exercises[i].order}
            onChange={(e) =>
              setForm((prev) => {
                const newExercises = [...prev.exercises];
                newExercises[i].order = parseInt(e.target.value);
                return { ...prev, exercises: newExercises };
              })
            }
          />
        </div>
        <div>
          {form.exercises[i].sets.map((set, index) => (
            <div key={index}>
              <h4>Set : {index + 1}</h4>
              <div>
                <div>
                  <label htmlFor="">Reps</label>
                  <input
                    type="number"
                    name="reps"
                    value={set.reps}
                    onChange={(e) => handleSetValueChange(e, index)}
                  />
                </div>
                <div>
                  <label htmlFor="">Weight</label>
                  <input
                    type="number"
                    name="weight"
                    value={set.weight}
                    onChange={(e) => handleSetValueChange(e, index)}
                  />
                </div>
                <div>
                  <label htmlFor="">Unit</label>
                  <select
                    name="unit"
                    value={set.unit}
                    onChange={(e) => handleSetValueChange(e, index)}
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="">Rest time in seconds</label>
                  <input
                    type="number"
                    name="restTime"
                    value={set.restTime}
                    onChange={(e) => handleSetValueChange(e, index)}
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
                      console.log("checked",checked);
                      

                      setForm((prev) => {
                        const updatedExercises = prev.exercises.map(
                          (ex, exIndex) => {
                            if (exIndex === i) {
                              const updatedSets = ex.sets.map((s, sIndex) =>
                                sIndex === index
                                  ? { ...s, isDropSet: checked }
                                  : s,
                              );

                              return { ...ex, sets: updatedSets };
                            }
                            return ex;
                          },
                        );

                        return { ...prev, exercises: updatedExercises };
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
                      onChange={(e) =>
                        setForm((prev) => {
                          const updatedexercises = prev.exercises.map(
                            (ex, idx) => {
                              if (i === idx) {
                                const updatedsets = ex.sets.map((set, ins) => {
                                  if (index === ins) {
                                    return {
                                      ...set,
                                      dropSet: {
                                        weight: e.target.value,
                                        unit: set.dropSet.unit,
                                      },
                                    };
                                  } else {
                                    return set;
                                  }
                                });
                                return {
                                  ...ex,
                                  sets: updatedsets,
                                };
                              } else {
                                return ex;
                              }
                            },
                          );

                          return {
                            ...prev,
                            exercises: updatedexercises,
                          };
                        })
                      }
                    />
                    <label htmlFor="">Drop set unit</label>
                    <select
                      name="dropSetUnit"
                      value={set.dropSet.unit}
                      //khsdfh
                      onChange={(e) =>
                        setForm((prev) => {
                          const updatedexercises = prev.exercises.map(
                            (ex, idx) => {
                              if (i === idx) {
                                const updatedsets = ex.sets.map((set, ins) => {
                                  if (index === ins) {
                                    return {
                                      ...set,
                                      dropSet: {
                                        weight: set.dropSet.weight,
                                        unit: e.target.value,
                                      },
                                    };
                                  } else {
                                    return set;
                                  }
                                });
                                return {
                                  ...ex,
                                  sets: updatedsets,
                                };
                              } else {
                                return ex;
                              }
                            },
                          );

                          return {
                            ...prev,
                            exercises: updatedexercises,
                          };
                        })
                      }
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
                    onChange={(e) => handleSetValueChange(e, index)}
                  />
                </div>
              </div>
              <button onClick={(e) => handleRemoveSet(e, index)}>Remove</button>
            </div>
          ))}

          <button onClick={handleAddSet}>Add set</button>
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setForm((prev) => {
                const newExercises = [...prev.exercises];
                newExercises.splice(i, 1);
                return { ...prev, exercises: newExercises };
              });
            }}
          >
            Remove This Exercise
          </button>
        </div>
      </div>
      <div ref={bottomRef}></div>
    </div>
  );
};

export default SelectExercise;
