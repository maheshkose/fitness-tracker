import nodemailer, { createTransport } from 'nodemailer';
import catchAsyncError from '../Middlewares/catchAsyncError.js';
import Otp from '../Models/otpModel.js';

const transpoter = createTransport({
  
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    },
     tls: {
    rejectUnauthorized: false, }// 👈 ignores invalid/self-signed certificates
});

export const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        text
    };
    const info = await transpoter.sendMail(mailOptions);
    // console.log('Email sent: ' + info.response);
    return info;
}

const genarateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const saveOtpToDatabase = async (email, otp) => {
    const otpData = await Otp.create({ email, otp });
    return otpData;
};
const sendOtpEmail = async (to) => {
    const otp = genarateOtp();
    const otpData = saveOtpToDatabase(to, otp);
    const subject = 'Your OTP for Fitness Tracker';
    const text = `Your OTP for Fitness Tracker is: ${otp}`;
    const otpinfo = await sendEmail(to, subject, text);
    return otpinfo;
};

const verifyOtp = async (email, otp) => {
    const otpData = await Otp.findOne({ email, otp });
    if (!otpData) {
        return false;
    }
    await Otp.deleteOne({ _id: otpData._id });
    return true;
};
export { sendOtpEmail,verifyOtp };