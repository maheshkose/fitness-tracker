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

  
  const MetaData = [

  ];
  //  Validation
  if (!Array.isArray(workoutPlans) || workoutPlans.length === 0) {
    return next(new ErrorHandler(400, "Workout plans are required"));
  }

  //  Validate each workout plan
  const validatedPlans = workoutPlans.map((plan, planIndex) => {
    MetaData.push(plan._id);
    if (!plan.name) {
      return next(new ErrorHandler(
        400,
        `Workout plan name missing at index ${planIndex}`
      ));
    }

    if (!Array.isArray(plan.exercises) || plan.exercises.length === 0) {
      return next(new ErrorHandler(
        400,
        `Exercises missing in workout plan at index ${planIndex}`
      ))  
    }

    const validatedExercises = plan.exercises.map((ex, exIndex) => {
      MetaData.push(ex.exerciseId._id);
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
          return next(new ErrorHandler(
            400,
            `Invalid reps in plan ${planIndex}, exercise ${exIndex}, set ${setIndex}`
          ));
        }

        return {
          reps: set.reps,
          repRange: { minReps: set.repRange.minReps || 1, maxReps: set.repRange.maxReps || 12 },
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
      _id: plan._id,
      name: plan.name,
      description: plan.description,
      exercises: validatedExercises
    };
  });

  console.log("Validated Plans:", validatedPlans);
  console.log("MetaData",MetaData);
  
  console.log("workoutPlans",workoutPlans); // Debugging line to check the meta data

  
  //  Create session
  const session = await WorkoutSession.create({
    userId,
    metaData:MetaData,
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

export const getAllWorkoutSessions = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const workoutSessions = await WorkoutSession.find({ userId }).populate("workoutPlans.exercises.exerciseId").populate("workoutPlans._id").sort({ date: -1 });

  if(!workoutSessions || workoutSessions.length === 0) {
    return next(new ErrorHandler(404, "No workout sessions found for this user"));
  }

  res.status(200).json({
    success: true,
    message: "Workout sessions retrieved successfully",
    workoutSessions
  });

});

export const getWorkoutSessionById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const workoutSession = await WorkoutSession.findOne({ _id: id, userId }).populate("workoutPlans.exercises.exerciseId");
  if (!workoutSession) {
    return next(new ErrorHandler(404, "Workout session not found"));
  }

  res.status(200).json({
    success: true,
    message: "Workout session retrieved successfully",
    workoutSession
  });
});

export const updateWorkoutSessionById = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;

   

    const {
    workoutPlans = [],
    date,
    completed = false
  } = req.body;

  //  Validation
  if (!Array.isArray(workoutPlans) || workoutPlans.length === 0) {
    return next(new ErrorHandler(400, "Workout plans are required"));
  }

  //  Validate each workout plan
  const validatedPlans = workoutPlans.map((plan, planIndex) => {
    if (!plan.name) {
      return next(new ErrorHandler(
        400,
        `Workout plan name missing at index ${planIndex}`
      ));
    }

    if (!Array.isArray(plan.exercises) || plan.exercises.length === 0) {
      return next(new ErrorHandler(
        400,
        `Exercises missing in workout plan at index ${planIndex}`
      ));
    }

    const validatedExercises = plan.exercises.map((ex, exIndex) => {
      if (!ex.exerciseId) {
        return next(new ErrorHandler(
          400,
          `ExerciseId missing in plan ${planIndex}, exercise ${exIndex}`
        ));
      }

      if (!Array.isArray(ex.sets) || ex.sets.length === 0) {
        return next(new ErrorHandler(
          400,
          `Sets required in plan ${planIndex}, exercise ${exIndex}`
        ));
      }

      const validatedSets = ex.sets.map((set, setIndex) => {
        if (!set.reps || set.reps <= 0) {
          return next(new ErrorHandler(
            400,
            `Invalid reps in plan ${planIndex}, exercise ${exIndex}, set ${setIndex}`
          ));
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
      _id: plan._id,
      userId,
      name: plan.name,
      description: plan.description,
      exercises: validatedExercises
    };
  });

  const updatedSession = await WorkoutSession.findOneAndUpdate(
    { _id: id, userId },
    {
      workoutPlans: validatedPlans,
      date: date || Date.now(),
      completed
    },
    { new: true }
  );

  if (!updatedSession) {
    return new ErrorHandler(404, "Workout session not found or update failed");
  }
  res.status(200).json({
    success: true,
    message: "Workout session updated successfully",
    workoutSession: updatedSession
  });

});

export const deleteWorkoutSessionById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const deletedSession = await WorkoutSession.findOneAndDelete({ _id: id, userId });

  if (!deletedSession) {
    return new ErrorHandler(404, "Workout session not found or delete failed");
  }

  res.status(200).json({
    success: true,
    message: "Workout session deleted successfully"
  });
});