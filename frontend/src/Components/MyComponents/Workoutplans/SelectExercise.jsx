import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useAppContext } from "@/Context/AppContext";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";


import {
  Check,
  ChevronsUpDown,
} from "lucide-react";

const SelectExercise = ({ form, setForm, i }) => {
  const bottomRef = useRef(null);
  const scrollbottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const { getAllExercises } = useAppContext();
  const [exercises, setExercises] = useState([]);
  const [exerciseSearch, setExerciseSearch] = useState("");

  const getAllExercisesHandler = async () => {
    const res = await getAllExercises();
    setExercises(res.data.exercises);
  };

  useEffect(() => {
    getAllExercisesHandler();
  }, []);

  const selectedExerciseId = form.exercises[i]?.exerciseId || "";
  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(exerciseSearch.toLowerCase()) ||
    exercise._id === selectedExerciseId
  );

  const handleExerciseChange = (e, i) => {
    const selectedExerciseId = e.target.value;
    const selectedExercise = exercises.find((ex) => ex._id === selectedExerciseId);

    setForm((prev) => {
      const updatedExercises = prev.exercises.map((ex, index) => {
        if (index === i) {
          return {
            ...ex,
            exerciseName: selectedExercise?.name || "",
            exerciseId: selectedExerciseId,
          };
        }
        return ex;
      });
      return {
        ...prev,
        exercises: updatedExercises,
      };
    });
  };

  const handleAddSet = (e) => {
    e.preventDefault();
    setForm((prev) => {
      const updatedExercises = prev.exercises.map((ex, index) => {
        if (i === index) {
          return {
            ...ex,
            sets: [...ex.sets, createSet()],
          };
        }
        return ex;
      });

      return { ...prev, exercises: updatedExercises };
    });
    scrollbottom();
  };

  const handleRemoveSet = (e, idx) => {
    e.preventDefault();
    if (form.exercises[i].sets.length === 1) {
      toast.error("Each exercise must have at least one set");
      return;
    }
    setForm((prev) => {
      const updatedExercise = prev.exercises.map((ex, index) => {
        if (i === index) {
          return {
            ...ex,
            sets: ex.sets.filter((set, indx) => idx !== indx),
          };
        }
        return ex;
      });
      return {
        ...prev,
        exercises: updatedExercise,
      };
    });
  };

  const handleSetValueChange = (e, idx) => {
    const name = e.target.name;
    let value = e.target.type === "number" ? parseInt(e.target.value) : e.target.value;

    if (value === "on") {
      value = true;
    }

    setForm((prev) => {
      const updatedExercises = prev.exercises.map((ex, index) => {

        if (i === index) {
          const updatedSets = ex.sets.map((set, sIndex) => {

            const repRange = () => {
              if (name === "minReps" || name === "maxReps") {
                return { ...set.repRange, [name]: value };
              } else {
                return set.repRange;
              }
            }
            return idx === sIndex ? { ...set, repRange: repRange(), [name]: value } : set;
          }
          );
          return { ...ex, sets: updatedSets };
        }
        return ex;
      });
      return {
        ...prev,
        exercises: updatedExercises,
      };
    });
  };

  const createSet = () => ({
    repRange: { minReps: 1, maxReps: 12 },
    weight: 50,
    unit: "kg",
    restTime: 60,
    isDropSet: false,
    dropSet: {weight: 40, unit: "kg" },
    notes: "",
  });

  const inputClass =
    "h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";
  const selectClass = `${inputClass} appearance-none`;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {/* <label className="space-y-2">
          <span className="text-sm font-medium">Exercise name</span>
          <Input
            type="search"
            value={exerciseSearch}
            onChange={(e) => setExerciseSearch(e.target.value)}
            placeholder="Search exercises"
            aria-label="Search exercises"
          />
          <select
            name="exerciseId"
            className={selectClass}
            onChange={(e) => {
              handleExerciseChange(e, i);
            }}
            required
            value={selectedExerciseId}
          >
            <option value="" disabled>
              Select exercise
            </option>
            {filteredExercises.map((exercise) => (
              <option value={exercise._id} key={exercise._id}>
                {exercise.name}
              </option>
            ))}
          </select>
        </label> */}

        <Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      role="combobox"
      className="w-full justify-between"
    >
      {selectedExerciseId
        ? filteredExercises.find(
            (exercise) => exercise._id === selectedExerciseId
          )?.name
        : "Select exercise"}

      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </PopoverTrigger>

  <PopoverContent className="w-[300px] p-0">
    <Command>
      <CommandInput
        placeholder="Search exercises..."
        value={exerciseSearch}
        onValueChange={setExerciseSearch}
      />

      <CommandList>
        <CommandEmpty>
          No exercise found.
        </CommandEmpty>

        <CommandGroup>
          {filteredExercises.map((exercise) => (
            <CommandItem
              key={exercise._id}
              value={exercise.name}
              onSelect={() => {
                handleExerciseChange(
                  {
                    target: {
                      value: exercise._id,
                    },
                  },
                  i
                );

                setExerciseSearch("");
              }}
            >
              {exercise.name}

              {selectedExerciseId === exercise._id && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>

        <label className="space-y-2">
          <span className="text-sm font-medium">Order</span>
          <Input
            type="number"
            name="order"
            value={form.exercises[i]?.order || 1}
            onChange={(e) =>
              setForm((prev) => {
                const newExercises = [...prev.exercises];
                newExercises[i].order = parseInt(e.target.value);
                return { ...prev, exercises: newExercises };
              })
            }
          />
        </label>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Sets</h4>
          <Button type="button" size="sm" variant="outline" >
            {form.exercises[i].sets.length}
          </Button>
        </div>

        {form.exercises[i].sets.map((set, index) => (
          <div key={index} className="rounded-xl border border-border/70 bg-muted/30 p-3">
            <div className="mb-3 flex items-center justify-between" ref={form.exercises[i].sets.length - 1 === index ? bottomRef : null}>
              <h5 className="text-sm font-semibold">Set {index + 1}</h5>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={(e) => handleRemoveSet(e, index)}
              >
                Remove Set
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm">Min Reps</span>
                <Input
                  type="number"
                  name="minReps"
                  value={set.repRange?.minReps}
                  onChange={(e) => handleSetValueChange(e, index)}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm">Max Reps</span>
                <Input
                  type="number"
                  name="maxReps"
                  value={set.repRange?.maxReps}
                  onChange={(e) => handleSetValueChange(e, index)}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm">Weight</span>
                <Input
                  type="number"
                  name="weight"
                  value={set.weight}
                  onChange={(e) => handleSetValueChange(e, index)}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm">Unit</span>
                <select
                  name="unit"
                  value={set.unit}
                  onChange={(e) => handleSetValueChange(e, index)}
                  className={selectClass}
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-sm">Rest time (sec)</span>
                <Input
                  type="number"
                  name="restTime"
                  value={set.restTime}
                  onChange={(e) => handleSetValueChange(e, index)}
                />
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  name="isDropSet"
                  checked={set.isDropSet}
                  className="h-4 w-4 rounded border-input"
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setForm((prev) => {
                      const updatedExercises = prev.exercises.map((ex, exIndex) => {
                        if (exIndex === i) {
                          const updatedSets = ex.sets.map((s, sIndex) =>
                            sIndex === index ? { ...s, isDropSet: checked } : s,
                          );

                          return { ...ex, sets: updatedSets };
                        }
                        return ex;
                      });

                      return { ...prev, exercises: updatedExercises };
                    });
                  }}
                />
                <span>Drop set</span>
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm">Notes</span>
                <Input
                  type="text"
                  name="notes"
                  value={set.notes}
                  onChange={(e) => handleSetValueChange(e, index)}
                  placeholder="Optional coaching note"
                />
              </label>
            </div>

            {set.isDropSet && (
              <div className="mt-3 grid gap-3 rounded-lg border border-dashed border-border/70 bg-background/70 p-3 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm">Drop set weight</span>
                  <Input
                    type="number"
                    name="dropSetWeight"
                    value={set.dropSet.weight}
                    onChange={(e) =>
                      setForm((prev) => {
                        const updatedExercises = prev.exercises.map((ex, idx) => {
                          if (i === idx) {
                            const updatedSets = ex.sets.map((setItem, ins) => {
                              if (index === ins) {
                                return {
                                  ...setItem,
                                  dropSet: {
                                    weight: e.target.value,
                                    unit: setItem.dropSet.unit,
                                  },
                                };
                              }
                              return setItem;
                            });
                            return { ...ex, sets: updatedSets };
                          }
                          return ex;
                        });

                        return { ...prev, exercises: updatedExercises };
                      })
                    }
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm">Drop set unit</span>
                  <select
                    name="dropSetUnit"
                    value={set.dropSet.unit}
                    onChange={(e) =>
                      setForm((prev) => {
                        const updatedExercises = prev.exercises.map((ex, idx) => {
                          if (i === idx) {
                            const updatedSets = ex.sets.map((setItem, ins) => {
                              if (index === ins) {
                                return {
                                  ...setItem,
                                  dropSet: {
                                    weight: setItem.dropSet.weight,
                                    unit: e.target.value,
                                  },
                                };
                              }
                              return setItem;
                            });
                            return { ...ex, sets: updatedSets };
                          }
                          return ex;
                        });

                        return { ...prev, exercises: updatedExercises };
                      })
                    }
                    className={selectClass}
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </label>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between gap-2">

        <Button type="button" size="sm" variant="outline" onClick={handleAddSet}>
          Add set
        </Button>

        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            setForm((prev) => {
              const newExercises = [...prev.exercises];
              newExercises.splice(i, 1);
              return { ...prev, exercises: newExercises };
            });
          }}
        >
          Remove this exercise
        </Button>
      </div>

    </div>
  );
};

export default SelectExercise;
