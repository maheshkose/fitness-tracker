import express from "express";
import { forgotPasswordOtp, getUserDetails, loginUser, logoutUser, registerUser, sendGamilOtp, updatePassword, verifyForgotPasswordOtp, verifyGmailOtp } from "../Controllers/userControllers.js";
import { isUserAuthenticated } from "../Middlewares/Authenticate.js";


const userRouter = express.Router();
userRouter.post('/gmailOtp', sendGamilOtp);
userRouter.post('/verifyGmailOtp', verifyGmailOtp);
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/forgotPassword',forgotPasswordOtp);
userRouter.post('/verifyForgotPasswordOtp',verifyForgotPasswordOtp);
userRouter.post('/updatePassword',updatePassword);

userRouter.get('/logout', isUserAuthenticated, logoutUser);
userRouter.get('/getUserDetails',isUserAuthenticated ,getUserDetails);


export default userRouter;