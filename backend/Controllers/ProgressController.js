import catchAsyncError from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import { WorkoutPlan } from "../Models/WorkoutPlan.js";
import WorkoutSession from "../Models/workoutsession.js";

export const progressOfWorkoutPlan = catchAsyncError(async (req, res, next) => {
    // Implementation for progress of workout plan

    const { planId } = req.params;
    // Validate input
    if (!planId) {
      return next(new ErrorHandler(400, "Plan ID is required"));
    }
    const progress = await WorkoutSession.find({ userId: req.user.id }).populate("workoutPlans.exercises.exerciseId");

    if (!progress || progress.length <= 0) {
      return next(new ErrorHandler(404, "No progress found for the user"));
    }

    const p = progress.filter((session) => session.workoutPlans.some((plan) => plan._id.toString() === planId));
    console.log('p',p);
    



    
    res.status(200).json({
        success: true,
        message:"workout plan fetched successfully",
        p
    });
});


export const progressOfExercise = catchAsyncError(async (req,res,next) => {
  
  const {exerciseId} = req.params;
  const userId = req.user.id

  const progress = await WorkoutSession.find({userId:userId});

  const p = progress.filter((session)=>{
    let flag = false;
    session.workoutPlans.forEach((workoutPlan)=>{
      flag = workoutPlan.exercises.some((ex)=>ex.exerciseId.toString() === exerciseId);
      console.log("flag",flag);
    })
    return flag;
  })

  res.status(200).json({
    success:true,
    message:"exercise fetched ",
    p
  })
})


export const getAllWorkoutPlanUsedByUser = catchAsyncError(async (req,res,next) => {
  const userId = req.user.id;
  if(!userId){
    return next(new ErrorHandler(400,"user id is required"))
  }
  const workoutSessions = await WorkoutSession.find({userId:userId});

  const workoutPlans = workoutSessions.map((session)=>{
    return session.workoutPlans.map((plan)=>{
      return plan._id.toString();
    })
  })
  console.log('work all',workoutPlans);
  

  res.status(200).json({
    success:true,
    message:"workout plans fetched successfully mahesh",
    workoutPlans: [...new Set(workoutPlans.flat())]
  })

})


  