import { Schema, model } from "mongoose";

const exerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    muscleGroups: [
      {
        type: String,
        enum: [
          "chest",
          "back",
          "legs",
          "arms",
          "shoulders",
          "core",
          "full body",
        ],
      },
    ],
    muscles:[{
      type:String,
      required:true
    }],

    primaryMuscle: {
      type: String,
    },

    equipment: {
      type: String,
      enum: [
        "bodyweight",
        "dumbbell",
        "barbell",
        "machine",
        "cable",
        "kettlebell",
        "resistance band",
      ],
    },

    category: {
      type: String,
      enum: ["compound", "isolation"],
    },

    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    instructions: [
      {
        type: String,
      },
    ],

    tips: [
      {
        type: String,
      },
    ],

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },//added at controller

    isCustom: {
      type: Boolean,
      default: false,
    },

    isPublic: {
      type: Boolean,
      default: true,
    },
    isGlobal: {
      type: Boolean,
      default: false,
    },

    gifUrl: String,

    videoUrl: String,
  },
  { timestamps: true },
);
exerciseSchema.index({ name: "text" });
exerciseSchema.index({ muscleGroups: 1 });

const Exercise = model("Exercise", exerciseSchema);

export default Exercise;
