import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { createTransport } from 'nodemailer';
import Otp from '../Models/otpModel.js';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });

export const normalizeGmailPassword = (password) => {
    if (!password) return '';
    return password.replace(/\s+/g, '').trim();
};

const createMailerTransporter = () => {
    const user = process.env.GMAIL_USER?.trim();
    const pass = normalizeGmailPassword(process.env.GMAIL_PASS);

    if (!user || !pass) {
        throw new Error('Gmail credentials are not configured. Set GMAIL_USER and GMAIL_PASS in backend/.env.');
    }

    return createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user,
            pass,
        },
        requireTLS: true,
    });
};

const transporter = createMailerTransporter();

export const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: `"${process.env.GMAIL_FROM || 'Fitness Tracker'}" <${process.env.GMAIL_USER}>`,
        to,
        subject,
        text,
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
};

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