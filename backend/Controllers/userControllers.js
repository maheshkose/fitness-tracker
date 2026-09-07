import ErrorHandler from "../Middlewares/ErrorHandler.js";
import User, { isValidPassword } from "../Models/userModel.js";
import bcrypt from "bcryptjs"
import catchAsyncError from "../Middlewares/catchAsyncError.js";
import { generateCookies } from "../lib/jwt.js";
import { sendOtpEmail, verifyOtp } from "../lib/gmail.js";
const isProd = process.env.NODE_ENV === "production";

export const sendGamilOtp = catchAsyncError(async (req,res,next) => {
        const {email} = req.body;
        if (!email) {
            const e = new ErrorHandler(400,'Provide gmail field');
            console.log('e',e);
            
            const err = await next(e);
            console.log("error",err);
            
            return err;
        }
        const otpinfo = await sendOtpEmail(email);
        if (!otpinfo) {
            return  next(new ErrorHandler(500,'Failed to send OTP'))
        }
        res.status(200).json({success:true,message:"OTP sent successfully"})
});
export const verifyGmailOtp = catchAsyncError(async (req,res,next) => {
    const {email,otp} = req.body;
    if (!email || !otp) {
        return next(new ErrorHandler(400,'Provide all fields'))
    }
    const verify = await verifyOtp(email,otp);
    if (!verify) {
        return next(new ErrorHandler(400,'Invalid OTP'))
    }
    res.status(200).json({success:true,message:"OTP verified successfully"})
});


export const registerUser = catchAsyncError(async (req,res,next) => {
    const {email,name,userName,password} = req.body;
    if (!email || !name || !userName || !password) {
        return next(new ErrorHandler(400,'Provide All fields'))
    }
    if (!isValidPassword(password)) {
        return next(new ErrorHandler(400,'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'))
    }
    const hashpass = await bcrypt.hash(password,10);

    const user = await User.create({email,name,userName,password:hashpass});
    res.status(200).json({success:true,message:"User registered succesfully",user:{...user._doc,password:undefined}})
})
export const loginUser = catchAsyncError(async (req,res,next) => {
    const {email,userName,password} = req.body;
    if ((!email && !userName) || !password) {
        return next(new ErrorHandler(400,'Provide All fields'))
    }
    const user = await User.findOne({$or:[{userName}, {email}]}).select("+password");
    if (!user) {
         return next(new ErrorHandler(400,"Please provide valid credentials"))
    }
    const decode = await bcrypt.compare(password,user.password);
    if (!decode) {
         return next(new ErrorHandler(400,"Please provide valid credentials"))
    }
    
    
    generateCookies(user,res);
})
export const getUserDetails = catchAsyncError(async (req,res,next) => {
    const userId = req.user.id;

    if (!userId) {
        return new ErrorHandler(404,"login first");
    }
    const user = await User.findById(userId);
    if(!user){
         return new ErrorHandler(404,"User does not exist on database");
    }
    res.status(200).json({
        success:true,
        message:"User detaild fetched",
        user
    })
})
export const logoutUser = catchAsyncError(async (req,res,next) => {
    const {UserToken} = req.cookies;
    if (!UserToken) {
        return next(new ErrorHandler(400,'User not logged in'))
    }
    res.clearCookie("UserToken",{
        httpOnly:true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
    });
    res.status(200).json({success:true,message:"User logged out successfully"})
})