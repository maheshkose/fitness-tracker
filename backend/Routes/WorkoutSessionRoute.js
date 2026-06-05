import express from "express";
import {
  createWorkoutSession,
  getAllWorkoutSessions,
  getWorkoutSessionById,
  updateWorkoutSessionById,
  deleteWorkoutSessionById,
} from "../Controllers/WorkoutSessionController.js";
import { isUserAuthenticated } from "../Middlewares/Authenticate.js";

const workoutSessionRouter = express.Router();
workoutSessionRouter.post("/create", isUserAuthenticated, createWorkoutSession);
workoutSessionRouter.get("/", isUserAuthenticated, getAllWorkoutSessions);
workoutSessionRouter.get("/:id", isUserAuthenticated, getWorkoutSessionById);
workoutSessionRouter.put("/:id", isUserAuthenticated, updateWorkoutSessionById);
workoutSessionRouter.delete("/:id",isUserAuthenticated,deleteWorkoutSessionById);

export default workoutSessionRouter;
