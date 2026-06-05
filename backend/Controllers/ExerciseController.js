import catchAsyncError from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import Exercise from "../Models/Excercise.js";


export const createExercise = catchAsyncError(async (req, res, next) => {
  const {
    name,
    description,
    muscleGroups,
    muscles,
    primaryMuscle,
    equipment,
    category,
    difficulty,
    instructions,
    tips,
    isCustom,
    isPublic,
    gifUrl,
    videoUrl
  } = req.body;
  //add video and gif url validation later

   if (muscleGroups && (!Array.isArray(muscleGroups) || muscleGroups.length === 0)) {
    return next(new ErrorHandler(400, "Muscle groups must be a non-empty array"));
  }
  if (muscles && (!Array.isArray(muscles) || muscles.length === 0)) {
    return next(new ErrorHandler(400, "Muscles must be a non-empty array"));
  }
  if (!name) {
    throw new ErrorHandler(400, "Exercise name is required");
  }

  const exercise = await Exercise.create({
    name: name.trim(),
    description,
    muscleGroups,
    muscles,
    primaryMuscle,
    equipment,
    category,
    difficulty,
    instructions,
    tips,
    createdBy: req.user.id,
    isCustom: isCustom || false,
    isPublic: isPublic !== undefined ? isPublic : true,
    gifUrl,
    videoUrl
  });
  if (!exercise) {
     return next(new ErrorHandler(500, "Failed to create exercise"));
  }

  res.status(201).json({
    success: true,
    message: "Exercise created successfully",
    exercise
  });
});

export const getAllExercises = catchAsyncError(async (req, res) => {
  const exercises = await Exercise.find();

  res.status(200).json({
    success: true,
    message: "Exercises retrieved successfully",
    count: exercises.length,
    exercises
  });
});
export const getAllGlobalExercises = catchAsyncError(async (req, res) => {
  
  const exercises = await Exercise.find();

  res.status(200).json({
    success: true,
    message: "Exercises retrieved successfully",
    count: exercises.length,
    exercises
  });
});

export const getExerciseById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new ErrorHandler(400, "Exercise ID is required"));
  }

  const exercise = await Exercise.findById(id);

  if (!exercise) {
    throw new ErrorHandler(404, "Exercise not found");
  }

  res.status(200).json({
    success: true,
    message: "Exercise retrieved successfully",
    exercise
  });
});

export const updateExercise = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  
  

  const exercise = await Exercise.findById(id);

  if (!exercise) {
    throw new ErrorHandler(404, "Exercise not found");
  }
  if (!req.body.isCustom) {
    return next(new ErrorHandler(403, "Only custom exercises can be updated"));
  }
  console.log(req.user.id);
  console.log(exercise.createdBy.toString());
  console.log(req.user.id !== exercise.createdBy);
  
  
  if ( req.user.id !== exercise.createdBy.toString()) {
    return next(new ErrorHandler(403, "You can only update exercises you created"));
  }

  const updatedExercise = await Exercise.findByIdAndUpdate(
    id,
    req.body,
    {
      returnDocument: 'after',
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    message: "Exercise updated successfully",
    exercise: updatedExercise
  });
});

export const deleteExercise = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const exercise = await Exercise.findById(id);

  if (!exercise) {
    throw new ErrorHandler(404, "Exercise not found");
  }

  await exercise.deleteOne();

  res.status(200).json({
    success: true,
    message: "Exercise deleted successfully"
  });
});