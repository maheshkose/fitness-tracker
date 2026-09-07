import { Schema,model } from "mongoose";
import { workoutPlanSchema } from "./WorkoutPlan.js";

const workoutSessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  metaData:[
    {type:Schema.Types.Mixed,}
  ],

  workoutPlans:[ {
    type: workoutPlanSchema ,
    default: null,
  }],

  date: {
    type: Date,
    default: Date.now,
  },

  completed: {
    type: Boolean,
    default: false,
  },

},{ timestamps: true });

const WorkoutSession = model("WorkoutSession", workoutSessionSchema);

export default WorkoutSession;