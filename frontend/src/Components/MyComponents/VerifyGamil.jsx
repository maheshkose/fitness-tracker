import React, { useState } from "react";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAppContext } from "@/Context/AppContext";
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";
import SignUpform from "./SignUpform";

const VerifyGamil = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();
  const [resendOtp, setResendOtp] = useState(false);
  const [resendOtpTimer, setResendTimerOtp] = useState(0);
  const [resendOtpInterval, setResendOtpInterval] = useState(null);
  const [isGmailverified, setisGmailverified] = useState(false);

  const startResendOtpTimer = () => {
    setResendTimerOtp(5 * 60);
    const interval = setInterval(() => {
      setResendTimerOtp((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendOtp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setResendOtpInterval(interval);
  };
  

  const {sendGmailOtp,verifyGmailOtp} =  useAppContext();
  const sendGmail = async(e) => {
    e.preventDefault();
    // Handle sending OTP to email logic here
    console.log('send');
    if(!email) {
      toast.error("Please enter an email address");  
      return;
    }
  
    
    const res = await sendGmailOtp(email);
    if(res?.data?.success){
      setIsEmailSent(true);
      setTimeout(() => {
        setResendOtp(true);
      }, 5*60*10000);
      toast.success(res.data.message);
    } else {
      toast.error(res.data?.message);
    }
    
  }
    const handleKeyDown = async(e) => {
      if (e.key === 'Enter') {
        if(e.target.name === "email"){
          await sendGmail(e);
        } else if(e.target.name === "otp"){
          await verifyOTP(e);
        }
        
      }}

  const verifyOTP = async(e) => {
    e.preventDefault();
    // Handle OTP verification logic here
    
    if(!otp) {
      toast.error("Please enter the OTP");  
      return;
    }
    console.log('verify');
    const res = await verifyGmailOtp(email,otp);
    if(res?.data?.success){
      toast.success(res.data.message);
      setisGmailverified(true);
    } else {
      toast.error(res.response?.data?.message || "Failed to verify OTP");
    }
  }
  return (
    <div>
      <FieldSet className="w-full max-w-xs">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="max.leiter@gmail.com" disabled={isEmailSent} name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} onKeyDown={handleKeyDown} />
            <FieldDescription>
              Enter the email address associated with your account. We will send you an OTP to verify your email.
            </FieldDescription>
            {/* <div>
              {isEmailSent && (
                <div className="mt-2 text-sm text-gray-600">
                  Didn't receive the OTP?{" "}
                  {resendOtp ? (
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => {
                        sendGmail();
                        startResendOtpTimer();
                      }}
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <span>Resend OTP in {Math.floor(resendOtpTimer / 60)}:{(resendOtpTimer % 60).toString().padStart(2, '0')}</span>
                  )}
                </div>
              )}

            </div> */}
          </Field>
          <Field>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
            <Input id="otp" type="digit" placeholder="000000" disabled={!isEmailSent} name="otp" value={otp} onChange={(e)=>{setOtp(e.target.value)}} onKeyDown={handleKeyDown}/>
            <FieldDescription>
              Enter the 6-digit code sent to your email.
            </FieldDescription>
          </Field>
        </FieldGroup>
        <Button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={isEmailSent?verifyOTP:sendGmail}>
          {isEmailSent?"Verify OTP":"Send OTP"}
        </Button>
      </FieldSet>
      {isGmailverified && (
        <div>
          <SignUpform email={email} />
        </div>
      )}
    </div>
  );
};

export default VerifyGamil;
