import express from "express"
import 'dotenv/config';
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./lib/dbConnect.js";
import errorHandler from "./Middlewares/errorHandlerMiddleware.js";

const app = express();
//json for parsing json 
app.use(express.json());
//cors config
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));
//cookie parser for cookie managment
app.use(cookieParser());
//database connection
connectDb();

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to home route</h1>');
})

//importing routes
import userRouter from "./Routes/userRoutes.js";
import bodymetricsRouter from "./Routes/bodymetricsRoute.js";
import exerciseRouter from "./Routes/exerciseRoute.js";
import workoutPlanRouter from "./Routes/workoutPlanRoute.js";
import workoutSessionRouter from "./Routes/WorkoutSessionRoute.js";
app.use('/api/v1/user',userRouter);
app.use('/api/v1/bodymetrics',bodymetricsRouter);
app.use('/api/v1/exercise',exerciseRouter);
app.use('/api/v1/workoutplans',workoutPlanRouter);
app.use('/api/v1/workoutsessions',workoutSessionRouter);

const port = process.env.PORT;
app.use(errorHandler);
app.listen(3000,()=>console.log(`server is running on port http://localhost:${port}`));