import catchAsyncError from "../Middlewares/catchAsyncError.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import BodyMetric from "../Models/bodymetrics.js";

export const addBodyMetric = catchAsyncError(async (req, res,next) => {
    // Logic to add a body metric
    const { type, value, unit, recordedAt } = req.body;
    // Validate input
    if (!type || !value || !unit) {
      return next(new ErrorHandler(400, "Type, value, and unit are required"));
    }

    const newMetric = await BodyMetric.create({
      userId: req.user.id,
      type,
        value,
        unit,
        recordedAt: recordedAt || Date.now()
    });
    if (!newMetric) {
      return next(new ErrorHandler(500, "Failed to add body metric"));
    }
    res.status(201).json({
      success: true,
      message: "Body metric added successfully",
      metric: newMetric
    });

});

export const getAllBodyMetrics = catchAsyncError(async (req, res,next) => {
    // Logic to get all body metrics for the authenticated user
    const metrics = await BodyMetric.find({ userId: req.user.id }).sort({ recordedAt: -1 });
    if (!metrics || metrics.length === 0) {
      return next(new ErrorHandler(404, "No body metrics found"));
    }
    res.status(200).json({
      success: true,
      message: "Body metrics retrieved successfully",
      metrics
    });
});
export const getBodyMetricById = catchAsyncError(async (req, res,next) => {
    // Logic to get a specific body metric by ID
    const id = req.params.id;
    const metric = await BodyMetric.find({ _id: id, userId: req.user.id });
    if (!metric || metric.length === 0) {
      return next(new ErrorHandler(404, "Body metric not found"));
    }
    res.status(200).json({
      success: true,
      message: "Body metric retrieved successfully",
      metric
    });
});
export const updateBodyMetricById = catchAsyncError(async (req, res,next) => {
    // Logic to update a specific body metric by ID
    const id = req.params.id;
    const { type, value, unit, recordedAt } = req.body;
    const updatedMetric = await BodyMetric.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { type, value, unit, recordedAt },
      { new: true }
    );
    if (!updatedMetric) {
      return next(new ErrorHandler(404, "Body metric not found"));
    }
    res.status(200).json({
      success: true,
      message: "Body metric updated successfully",
      metric: updatedMetric
    });
});