import express from "express";
import {
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise
} from "../Controllers/ExerciseController.js";
import { isUserAuthenticated } from "../Middlewares/Authenticate.js";

const exerciseRouter = express.Router();

exerciseRouter.post("/create",isUserAuthenticated, createExercise);
exerciseRouter.get("/", getAllExercises);
exerciseRouter.get("/:id", getExerciseById);
exerciseRouter.put("/:id",isUserAuthenticated, updateExercise);
exerciseRouter.delete("/:id",isUserAuthenticated, deleteExercise);

export default exerciseRouter;