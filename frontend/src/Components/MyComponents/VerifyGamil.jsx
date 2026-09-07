import React, { useState } from "react";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAppContext } from "@/Context/AppContext";
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";
import SignUpform from "./SignUpform";

const VerifyGamil = ({setIsSignUp}) => {
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
    <>
  {isGmailverified ? <SignUpform email={email} setIsSignUp={setIsSignUp} /> :
    
    <Card className="w-full max-w-md rounded-[1.5rem] border border-slate-200/80 bg-white/95 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/85 dark:shadow-black/30">
    <CardHeader className="border-b border-slate-200/80 pb-5 dark:border-white/10">
      <div className="inline-flex w-fit items-center rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-700 dark:text-cyan-300">
        Verify your account
      </div>
      <CardTitle className="mt-3 text-2xl font-semibold">Verify Email</CardTitle>
      <CardDescription className="text-sm text-slate-600 dark:text-slate-400">
        Enter your email and the 6-digit code we send you.
      </CardDescription>
    </CardHeader>
    <CardContent className="pt-5">
      
      
        <FieldSet className="w-full">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              disabled={isEmailSent}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50"
            />
            <FieldDescription className="text-slate-500 dark:text-slate-400">
              We’ll send a one-time password to verify your address.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              placeholder="000000"
              disabled={!isEmailSent}
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onKeyDown={handleKeyDown}
              className="rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50"
            />
            <FieldDescription className="text-slate-500 dark:text-slate-400">
              Enter the 6-digit code sent to your email.
            </FieldDescription>
          </Field>
        </FieldGroup>
        <Button className="mt-4 w-full rounded-full bg-cyan-600 text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400" onClick={isEmailSent ? verifyOTP : sendGmail}>
          {isEmailSent ? 'Verify OTP' : 'Send OTP'}
        </Button>
      </FieldSet>
      
    </CardContent>
    <CardFooter className="flex justify-between border-t border-slate-200/80 pt-4 dark:border-white/10">
      <Button variant="link" className="px-0 text-cyan-700 dark:text-cyan-300" onClick={() => setIsSignUp(false)}>
        Back to sign in
      </Button>
    </CardFooter>
  </Card>}
    </>
  );
    
};

export default VerifyGamil;
