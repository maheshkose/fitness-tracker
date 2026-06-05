import express from "express";
import {
  createWorkoutPlan,
  getAllWorkoutPlans,
  getWorkoutPlanById,
  updateWorkoutPlanById,
deleteWorkoutPlanById,
getAllWorkoutPlansOfUser
} from "../Controllers/workoutPlanControllers.js";
import { isUserAuthenticated } from "../Middlewares/Authenticate.js";

const workoutPlanRouter = express.Router();

workoutPlanRouter.post("/create",isUserAuthenticated, createWorkoutPlan);
workoutPlanRouter.get("/", getAllWorkoutPlans);
workoutPlanRouter.get("/ofuser", getAllWorkoutPlansOfUser);
workoutPlanRouter.get("/:id", getWorkoutPlanById);
workoutPlanRouter.put("/:id",isUserAuthenticated, updateWorkoutPlanById);
workoutPlanRouter.delete("/:id",isUserAuthenticated, deleteWorkoutPlanById);

export default workoutPlanRouter;