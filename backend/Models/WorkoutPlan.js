import { Schema, model } from "mongoose";

export const workoutPlanSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      unieq: true,
      trim: true,
    },

    description: String,

    exercises: [
      {
        exerciseId: {
          type: Schema.Types.ObjectId,
          ref: "Exercise",
          required: true,
        },

        order: {
          type: Number,
          required: true,
        },

        sets: [
          {
            reps: {
              type: Number,
              min: 1,
              required: true,
            },

            weight: {
              type: Number,
              min: 0,
              default: 0,
            },

            unit: {
              type: String,
              enum: ["kg", "lbs"],
              default: "kg",
            },

            restTime: {
              type: Number,
              min: 0,
              default: 60,
            },

            isDropSet: {
              type: Boolean,
              default: false,
            },

            dropSet: {
              weight: {
                type: Number,
                min: 0,
              },
              reps: {
                type: Number,
                min: 1,
              },
            },
             notes:{
                type: String,
                default: "just do it",
            },
            videoUrl:{
                type: String,
                default: "how to do it",
            }
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const WorkoutPlan = model("WorkoutPlan", workoutPlanSchema);



const workoutSplitSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: String,

    startDate: {
      type: Date,
      default: Date.now,
    },

    isWeekly: {
      type: Boolean,
      default: true,
    },

    days: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },

        order: {
          type: Number,
          required: true,
        },

        isRestDay: {
          type: Boolean,
          default: false,
        },

        workoutPlans: [
          {
            planId: {
              type: Schema.Types.ObjectId,
              ref: "WorkoutPlan",
              required: true,
            },

            type: {
              type: String,
              enum: ["strength", "cardio", "mobility", "flexibility"],
              default: "strength",
            },

            duration: {
              type: Number, // minutes
            },

            order: {
              type: Number,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);


const WorkoutSplit = model("WorkoutSplit", workoutSplitSchema);




export { WorkoutPlan, WorkoutSplit };

const workoutSplit1 = {
  userId: "65f123abc123abc123abc123",
  name: "Push Pull Legs",
  days: [
    { day: "Monday", workoutPlan: "pushId" },
    { day: "Tuesday", workoutPlan: "pullId" },
    { day: "Wednesday", workoutPlan: "legsId" },
    { day: "Thursday", isRestDay: true },
  ],
};