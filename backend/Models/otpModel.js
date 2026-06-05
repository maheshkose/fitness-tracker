import {Schema, model} from 'mongoose';

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
        min: 6,
        max: 6,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // OTP expires after 5 minutes
    },

},{timestamps: true});

const Otp = model('Otp', otpSchema);
export default Otp;