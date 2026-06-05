import { Schema, model } from "mongoose";

// ✅ ENUMS
const METRIC_TYPES = [
  "weight",
  "height",
  "bodyFat",

  "chest",
  "waist",
  "hips",
  "arms",
  "forearms",
  "thighs",
  "calves",
  "neck",
  "shoulders",

  "bloodPressureSystolic",
  "bloodPressureDiastolic",
  "heartRate",
  "restingHeartRate",
  "bloodSugar",
  "fastingBloodSugar",
  "oxygenSaturation"
];

// ✅ UNIT MAPPING
const UNIT_MAP = {
  weight: ["kg", "lbs"],
  height: ["cm", "inch", "ft"],

  bodyFat: ["%"],

  chest: ["cm", "inch"],
  waist: ["cm", "inch"],
  hips: ["cm", "inch"],
  arms: ["cm", "inch"],
  forearms: ["cm", "inch"],
  thighs: ["cm", "inch"],
  calves: ["cm", "inch"],
  neck: ["cm", "inch"],
  shoulders: ["cm", "inch"],

  bloodPressureSystolic: ["mmHg"],
  bloodPressureDiastolic: ["mmHg"],

  heartRate: ["bpm"],
  restingHeartRate: ["bpm"],

  bloodSugar: ["mg/dL"],
  fastingBloodSugar: ["mg/dL"],

  oxygenSaturation: ["%"]
};

// ✅ CATEGORY (for UI grouping)
const CATEGORY_MAP = {
  weight: "body",
  height: "body",
  bodyFat: "body",

  chest: "girth",
  waist: "girth",
  hips: "girth",
  arms: "girth",
  forearms: "girth",
  thighs: "girth",
  calves: "girth",
  neck: "girth",
  shoulders: "girth",

  bloodPressureSystolic: "health",
  bloodPressureDiastolic: "health",
  heartRate: "health",
  restingHeartRate: "health",
  bloodSugar: "health",
  fastingBloodSugar: "health",
  oxygenSaturation: "health"
};

// ✅ SCHEMA
const bodyMetricSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    type: {
      type: String,
      required: true,
      enum: METRIC_TYPES
    },

    value: {
      type: Number,
      required: true
    },

    unit: {
      type: String,
      required: true
    },

    category: {
      type: String,
    },

    recordedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);


// ✅ VALIDATION (VERY IMPORTANT)
bodyMetricSchema.pre("save", function (next) {
  const allowedUnits = UNIT_MAP[this.type];

  if (!allowedUnits.includes(this.unit)) {
    return next(
      new Error(`Invalid unit '${this.unit}' for type '${this.type}'`)
    );
  }

  // auto assign category
  this.category = CATEGORY_MAP[this.type];

  
});


// ✅ INDEX (for fast graph queries)
bodyMetricSchema.index({ userId: 1, type: 1, recordedAt: -1 });


// ✅ MODEL
const BodyMetric = model("BodyMetric", bodyMetricSchema);

export default BodyMetric;