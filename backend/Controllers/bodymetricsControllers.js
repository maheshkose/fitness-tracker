import mongoose from "mongoose";
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
    const recordedAtDate = new Date(recordedAt);


    const newMetric = await BodyMetric.create({
      userId: req.user.id,
      type,
        value,
        unit,
        recordedAt: recordedAtDate || Date.now()
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
    // const metrics = await BodyMetric.find({ userId: req.user.id }).sort({ recordedAt: -1 });

    // console.log(req.user.id);

    const metrics = await BodyMetric.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      { $sort: { recordedAt: 1 } },
      { $group:{_id:"$type",metrics:{$push:{_id:"$_id",type:"$type",value:"$value",unit:"$unit",recordedAt:"$recordedAt"}} }}
    ]);
    // console.log(metrics);
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