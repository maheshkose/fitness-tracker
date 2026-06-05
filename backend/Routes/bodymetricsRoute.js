import express from "express";
import { isUserAuthenticated } from "../Middlewares/Authenticate.js";
import { addBodyMetric,getAllBodyMetrics,getBodyMetricById, updateBodyMetricById } from "../Controllers/bodymetricsControllers.js";


const bodymetricsRouter = express.Router();
bodymetricsRouter.post("/add",isUserAuthenticated,addBodyMetric);
bodymetricsRouter.get("/",isUserAuthenticated,getAllBodyMetrics);
bodymetricsRouter.get("/:id",isUserAuthenticated,getBodyMetricById);
bodymetricsRouter.put("/:id",isUserAuthenticated,updateBodyMetricById);


export default bodymetricsRouter;