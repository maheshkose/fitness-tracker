import ExerciseManager from "@/Components/MyComponents/Exercise/Exercise";
import CreateWorkOutPlans from "@/Components/MyComponents/Workoutplans/CreateWorkOutPlans";
import { Button } from "@/Components/ui/button";
import { useAppContext } from "@/Context/AppContext";
import React, { useEffect, useState } from "react";

const WorkoutPlans = () => {
  const {getAllWorkoutPlans} = useAppContext();
  const [editingId, seteditingId] = useState(null);

  const [workoutPlans, setworkoutPlans] = useState([]);
    const getAllWorkoutPlansHandler = async () => {
      const res = await getAllWorkoutPlans();
      setworkoutPlans(res.data.workoutPlans);
    };
    useEffect(() => {
      getAllWorkoutPlansHandler();
    }, []);

   
  return <div>WorkoutPlans

  <CreateWorkOutPlans />
  <div>
    <h1>Workout Plans</h1>
    {workoutPlans?.map((workoutPlan,i)=>(
      <div key={i}>
        <h1>{workoutPlan.name}</h1>

        <div>
          <Button onClick={()=>{seteditingId(workoutPlan._id)}}>Edit</Button>
          <Button>Delete</Button>
        </div>
      </div>
    ))}
  </div>
  </div>;
};

export default WorkoutPlans;
