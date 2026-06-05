import { useAppContext } from "@/Context/AppContext";
import React, { useEffect, useRef, useState } from "react";
import SelectExercise from "./SelectExercise";
import { toast } from "sonner";
import { Button } from "@/Components/ui/button";
import useFormPersist from "@/hooks/useFormPersist";

const CreateWorkOutPlans = () => {
  const { createWorkoutPlan,updateWorkoutPlanById } = useAppContext();
  
    
    

  const createExercise = () => ({
    exerciseName: "",
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
  });
const { form, setForm, resetState } = useFormPersist("workoutPlanForm", {
    name: "",
    description: "",
    exercises: [],
  });
  
  console.log("exercise form", form);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  //api call for saving form to formbase
  const handleCreateWorkoutPlan = async () => {
    const res = await createWorkoutPlan(form);
    if (res.data.success) {
      toast.success(res.data.message);
      resetState();
    } else {
      toast.error(res.data.message);
    }
  };
  const handleUpdateWorkoutPlanById = async () => {
    const res = await updateWorkoutPlanById(form);
    if (res.data.success) {
      toast.success(res.data.message);
      resetState();
    } else {
      toast.error(res.data.message);
    }
  };

  // scroll to bottom
  const bottomRef = useRef(null);
  // useEffect(() => {
  //   scrollbottom();
  // }, [])
  const scrollbottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <div className="h-auto overflow-y-auto">
      <div>CreateWorkOutPlans</div>
      <div>
        <div>
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="relative">
          <h1>Exercises</h1>
          <div className="">
            {form.exercises.map((exe, index) => (
              <div key={index} className="border-2 border-gray-500 p-2 mb-2">
                <p>Exercise {index + 1}</p>
                <div>
                  <SelectExercise form={form} setForm={setForm} i={index} />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setForm((prev) => ({
                ...prev,
                exercises: [...prev.exercises, createExercise()],
              }));
              scrollbottom();
            }}
          >
            Add Exercise
          </button>
        </div>
        <Button onClick={handleCreateWorkoutPlan}>Add Workout Plan</Button>
      </div>
      
      <div ref={bottomRef}></div>
    </div>
  );
};

export default CreateWorkOutPlans;
