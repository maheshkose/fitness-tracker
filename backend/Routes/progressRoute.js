import e from "express";
import { isUserAuthenticated } from "../Middlewares/Authenticate.js";
import { progressOfExercise, progressOfWorkoutPlan,getAllWorkoutPlanUsedByUser } from "../Controllers/ProgressController.js";


const progressRouter = e.Router();


progressRouter.get('/workoutplan/:planId',isUserAuthenticated,progressOfWorkoutPlan);

progressRouter.get('/workoutplans/all',isUserAuthenticated,getAllWorkoutPlanUsedByUser);

progressRouter.get('/exercise/:exerciseId',isUserAuthenticated,progressOfExercise);
export default progressRouter;