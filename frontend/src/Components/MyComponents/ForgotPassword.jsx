import React, { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Button } from "../ui/button";
import { BsEye } from "react-icons/bs";
import { Input } from "../ui/input";
import { useAppContext } from "@/Context/AppContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle,CardFooter } from "../ui/card";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import useFormPersist from "@/hooks/useFormPersist";

const ForgotPassword = ({ email,setIsSignUp }) => {
    const { forgotPassword,verifyForgotPasswordOtp,updatePassword} =  useAppContext();
    const navigate = useNavigate();
    const { form, setForm, resetState } = useFormPersist("forgotPasswordForm", {
    email: email,
    username: "",
    otp:"",
    password: "",
    confirmPassword: "",
  });
  
  // const [form, setForm] = useState({
  //   email: email,
  //   username: "",
  //   otp:"",
  //   password: "",
  //   confirmPassword: "",
  // });

  const [showpassword, setshowpassword] = useState(false);
  const { username,otp, password, confirmPassword } = form;
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [submitType, setSubmitType] = useState('SEND OTP')//'VERIFY OTP','UPDATE PASSWORD'

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (submitType === "SEND OTP") {
      await sendOtpHandler();
    }
    if (submitType === "VERIFY OTP") {
      await verifyOtpHandler();
    }
    if (submitType === "UPDATE PASSWORD") {
      await updatePasswordHandler();
    }
  };

 async function sendOtpHandler() {
    const {username} = form;

    const res = await forgotPassword({userName:username});
    if(res?.data?.success){
      toast.success(res.data.message);
      setMessage(res.data?.message);
      setError("");
      setSubmitType("VERIFY OTP");
    }else{
      toast.error(res?.data?.message)
      setError(res?.data?.message)
      setMessage("")
    }
 }
 async function verifyOtpHandler() {
  const {username,otp} = form;

  const res = await verifyForgotPasswordOtp({userName: username, otp});
  if(res?.data?.success){
    toast.success(res.data.message);
     setMessage(res.data?.message);
     setError("");
    setSubmitType("UPDATE PASSWORD");
  }
else{
      toast.error(res?.data?.message)
      setError(res?.data?.message)
      setMessage("")
    }
  
 }

 async function updatePasswordHandler() {
   const {username,password,confirmPassword} = form;
   if (password !== confirmPassword) {
     toast.error("Passwords do not match");
     setError("Passwords do not match");
     setMessage("");
     return;
   }
    const res = await updatePassword({userName: username, password});
    if(res?.data?.success){
      toast.success(res.data.message);
       setMessage(res.data?.message)
      setError("")
      resetState();
      navigate('/login');
    }else{
      toast.error(res?.data?.message)
      setError(res?.data?.message)
      setMessage("")
    }

 }
  return (
    <Card className="w-full max-w-md rounded-[1.5rem] border border-slate-200/80 bg-white/95 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/85 dark:shadow-black/30">
      <CardHeader className="border-b border-slate-200/80 pb-5 dark:border-white/10">
        <div className="inline-flex w-fit items-center rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-700 dark:text-cyan-300">
          Forgot Password
        </div>
        <CardTitle className="mt-3 text-2xl font-semibold">Forgot Password</CardTitle>
        <CardDescription className="text-sm text-slate-600 dark:text-slate-400">
          Set up your account and start tracking your progress.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-5">
        <FieldSet>
          <FieldGroup>
           
           {/* <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                placeholder="your@email.com"
                name="email"
                value={email}
                disabled={true}
                className="rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50"
              />
            </Field> */}

            { <Field>
              <FieldLabel>User Name</FieldLabel>
              <Input
                type="text"
                placeholder="Choose a username"
                name="username"
                value={username}
                onChange={handleChange}
                disabled={submitType !== "SEND OTP"}
                className="rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50"
              />
              <FieldDescription>
                Enter your userName we will send you a otp on your registered Email Id
              </FieldDescription>
            </Field>}
            {
              <Field>
               <FieldLabel>OTP</FieldLabel>
              <Input
                type="text"
                placeholder="write Otp"
                name="otp"
                value={otp}
                onChange={handleChange}
                disabled={submitType !== "VERIFY OTP"}
                className="rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50"
              />
              <FieldDescription>
                Enter otp on your {form.email ? email:"registered Email"} Id
              </FieldDescription>
              </Field>
            }

            { submitType === "UPDATE PASSWORD"&&
             <>
             <Field className="relative">
              <FieldLabel>Password</FieldLabel>
              <Input
                type={showpassword ? 'text' : 'password'}
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={handleChange}
                className="rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50"
              />
              <FieldDescription className="text-slate-500 dark:text-slate-400">
                Must be at least 8 characters with uppercase, lowercase, a number and a symbol.
              </FieldDescription>
              <span>
                <BsEye
                  className="absolute right-3 top-[38px] cursor-pointer text-slate-500 dark:text-slate-300"
                  onClick={() => setshowpassword(!showpassword)}
                />
              </span>
            </Field>
            <Field className="relative">
              <FieldLabel>Confirm Password</FieldLabel>
              <Input
                type={showpassword ? 'text' : 'password'}
                placeholder="Confirm password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className="rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50"
              />
              <span>
                <BsEye
                  className="absolute right-3 top-[38px] cursor-pointer text-slate-500 dark:text-slate-300"
                  onClick={() => setshowpassword(!showpassword)}
                />
              </span>
            </Field>
             </>   
            }
          </FieldGroup>
          <Field>
            <FieldDescription className={message?"text-green-900":(error)?"text-red-900":""}>
              {message ? <p className="text-green-900">{message}</p>: ""}
              {error ? <p className="text-red-900">{error}</p>:""}
            </FieldDescription>
          </Field>
          <Button className="mt-4 w-full rounded-full bg-cyan-600 text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400" onClick={handleSubmit}>
            {
                submitType.toLowerCase()
            }
          </Button>
        </FieldSet>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-slate-200/80 pt-4 dark:border-white/10">
        <Button variant="link" className="px-0 text-cyan-700 dark:text-cyan-300" >
          <Link to="/login">Back to Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ForgotPassword;
