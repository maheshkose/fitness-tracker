import catchAsyncError from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import WorkoutSession from "../Models/workoutsession.js";

export const createWorkoutSession = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;

  const {
    workoutPlans = [],
    date,
    completed = false
  } = req.body;

  //  Validation
  if (!Array.isArray(workoutPlans) || workoutPlans.length === 0) {
    throw new ErrorHandler(400, "Workout plans are required");
  }

  //  Validate each workout plan
  const validatedPlans = workoutPlans.map((plan, planIndex) => {
    if (!plan.name) {
      throw new ErrorHandler(
        400,
        `Workout plan name missing at index ${planIndex}`
      );
    }

    if (!Array.isArray(plan.exercises) || plan.exercises.length === 0) {
      throw new ErrorHandler(
        400,
        `Exercises missing in workout plan at index ${planIndex}`
      );
    }

    const validatedExercises = plan.exercises.map((ex, exIndex) => {
      if (!ex.exerciseId) {
        throw new ErrorHandler(
          400,
          `ExerciseId missing in plan ${planIndex}, exercise ${exIndex}`
        );
      }

      if (!Array.isArray(ex.sets) || ex.sets.length === 0) {
        throw new ErrorHandler(
          400,
          `Sets required in plan ${planIndex}, exercise ${exIndex}`
        );
      }

      const validatedSets = ex.sets.map((set, setIndex) => {
        if (!set.reps || set.reps <= 0) {
          throw new ErrorHandler(
            400,
            `Invalid reps in plan ${planIndex}, exercise ${exIndex}, set ${setIndex}`
          );
        }

        return {
          reps: set.reps,
          weight: set.weight || 0,
          unit: set.unit || "kg",
          restTime: set.restTime || 60,
          isDropSet: set.isDropSet || false,
          dropSet: set.isDropSet ? set.dropSet : undefined,
          notes: set.notes,
          videoUrl: set.videoUrl
        };
      });

      return {
        
        exerciseId: ex.exerciseId,
        order: ex.order ?? exIndex + 1,
        sets: validatedSets
      };
    });

    return {
      userId,
      name: plan.name,
      description: plan.description,
      exercises: validatedExercises
    };
  });

  //  Create session
  const session = await WorkoutSession.create({
    userId,
    workoutPlans: validatedPlans,
    date: date || Date.now(),
    completed
  });
  if (!session) {
    throw new ErrorHandler(500, "Failed to create workout session");
  }

  res.status(201).json({
    success: true,
    message: "Workout session created successfully",
    session
  });
});

export const getAllWorkoutSessions = catchAsyncError(async (req, res, next) => {});

export const getWorkoutSessionById = catchAsyncError(async (req, res, next) => {});

export const updateWorkoutSessionById = catchAsyncError(async (req, res, next) => {});

export const deleteWorkoutSessionById = catchAsyncError(async (req, res, next) => {});