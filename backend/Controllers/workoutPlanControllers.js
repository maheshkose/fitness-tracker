import catchAsyncError from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import { WorkoutPlan } from "../Models/WorkoutPlan.js";


export const createWorkoutPlan = catchAsyncError(async (req, res, next) => {
  const { name, description, exercises = [] } = req.body;
  const userId = req.user.id;

  if (!name || name.trim() === "") {
    return next(new ErrorHandler(400, "Workout plan name is required"));
  }

  // Validate exercises
  if (!Array.isArray(exercises)) {
    return next(new ErrorHandler(400, "Exercises must be an array"));
  }

  const validatedExercises = exercises.map((ex, index) => {
    if (!ex.exerciseId) {
      throw new ErrorHandler(400, `Exercise ID missing at index ${index}`);
    }

    if (!Array.isArray(ex.sets) || ex.sets.length === 0) {
      throw new ErrorHandler(400, `Sets required for exercise at index ${index}`);
    }

    const validatedSets = ex.sets.map((set, setIndex) => {
      if (!set.reps || set.reps <= 0) {
        throw new ErrorHandler(
          400,
          `Invalid reps in exercise ${index}, set ${setIndex}`
        );
      }

      return {
        reps: set.reps,
        weight: set.weight || 0,
        restTime: set.restTime || 60,
        unit: set.unit || "kg",
        isDropSet: set.isDropSet || false,
        dropSet: set.isDropSet ? set.dropSet : undefined,
      };
    });

    return {
      exerciseId: ex.exerciseId,
      order: ex.order ?? index + 1,
      sets: validatedSets,
    };
  });

  const newPlan = await WorkoutPlan.create({
    userId,
    name: name.trim(),
    description,
    exercises: validatedExercises,
  });
  if (!newPlan) {
    return next(new ErrorHandler(500, "Failed to create workout plan"));
  }

  res.status(201).json({
    success: true,
    message: "Workout plan created successfully",
    workoutPlan: newPlan,
  });
});

export const getAllWorkoutPlans = catchAsyncError(async (req, res, next) => {
    
    const plans = await WorkoutPlan.find({}).populate("exercises.exerciseId");
    if (!plans || plans.length === 0) {
      return next(new ErrorHandler(404, "No workout plans found"));
    }
    res.status(200).json({
      success: true,
      message: "Workout plans retrieved successfully",
      workoutPlans: plans,
    });
});
export const getAllWorkoutPlansOfUser = catchAsyncError(async (req, res, next) => {
    const userId = req.user.id;
    const plans = await WorkoutPlan.find({ userId }).populate("exercises.exerciseId");
    if (!plans || plans.length === 0) {
      return next(new ErrorHandler(404, "No workout plans found"));
    }
    res.status(200).json({
      success: true,
      message: "Workout plans retrieved successfully",
      workoutPlans: plans,
    });
});

export const getWorkoutPlanById = catchAsyncError(async (req, res, next) => {
    const userId = req.user.id;
    const planId = req.params.id;
    const plan = await WorkoutPlan.findOne({ _id: planId, userId }).populate("exercises.exerciseId");
    if (!plan) {
      return next(new ErrorHandler(404, "Workout plan not found"));
    }
    res.status(200).json({
      success: true,
      message: "Workout plan retrieved successfully",
      workoutPlan: plan,
    });
});

export const updateWorkoutPlanById = catchAsyncError(async (req, res, next) => {
    const userId = req.user.id;
    const planId = req.params.id;
    const { name, description, exercises } = req.body;
    const updatedPlan = await WorkoutPlan.findOneAndUpdate(
        { _id: planId, userId },
        { name, description, exercises },
        { new: true }
    ).populate("exercises.exerciseId");
    if (!updatedPlan) {
        return next(new ErrorHandler(404, "Workout plan not found"));
    }
    res.status(200).json({
        success: true,
        message: "Workout plan updated successfully",
        workoutPlan: updatedPlan,
    });
});

export const deleteWorkoutPlanById = catchAsyncError(async (req, res, next) => {
    const userId = req.user.id;
    const planId = req.params.id;
    const deletedPlan = await WorkoutPlan.findOneAndDelete({ _id: planId, userId });
    if (!deletedPlan) {
      return next(new ErrorHandler(404, "Workout plan not found or already deleted"));
    }
    res.status(200).json({
      success: true,
      message: "Workout plan deleted successfully",
    });
});
