import express from "express";
import { getUserDetails, loginUser, logoutUser, registerUser, sendGamilOtp, verifyGmailOtp } from "../Controllers/userControllers.js";
import { isUserAuthenticated } from "../Middlewares/Authenticate.js";


const userRouter = express.Router();
userRouter.post('/gmailOtp', sendGamilOtp);
userRouter.post('/verifyGmailOtp', verifyGmailOtp);
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/logout', isUserAuthenticated, logoutUser);
userRouter.get('/getUserDetails',isUserAuthenticated ,getUserDetails);


export default userRouter;