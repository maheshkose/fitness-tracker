import { Schema, model } from "mongoose";

const exerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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

    isPrivate: {
      type: Boolean,
      default: false,
    },

    isPublic: {
      type: Boolean,
      default: false,
    },
    isGlobal: {
      type: Boolean,
      default: false,
    },

    gifUrl: {
      public_id:{
        type:String,
        default:'https://mir-s3-cdn-cf.behance.net/project_modules/max_632/2e398448645641.589d89e19a982.gif'
      },
      secure_url:{
        type:String,
        default:'https://mir-s3-cdn-cf.behance.net/project_modules/max_632/2e398448645641.589d89e19a982.gif'
      }
    },

    videoUrl: {
      public_id:{
        type:String,
        default:'https://mir-s3-cdn-cf.behance.net/project_modules/max_632/2e398448645641.589d89e19a982.gif'
      },
      secure_url:{
        type:String,
        default:'https://mir-s3-cdn-cf.behance.net/project_modules/max_632/2e398448645641.589d89e19a982.gif'
      }
    },
  },
  { timestamps: true },
);
exerciseSchema.index({ name: "text" });
exerciseSchema.index({ muscleGroups: 1 });

const Exercise = model("Exercise", exerciseSchema);

export default Exercise;
