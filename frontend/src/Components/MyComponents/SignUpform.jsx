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

const SignUpform = ({ email,setIsSignUp }) => {
    const {registerUser} =  useAppContext();
  const [data, setData] = useState({
    email: email,
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showpassword, setshowpassword] = useState(false);
  const { username, password, confirmPassword } = data;

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const {email,username,password,confirmPassword} = data;
    if (!email || !username || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const res = await registerUser(email,username,password);
    if(res?.data?.success){
      toast.success(res.data.message);
      setIsSignUp(false);
    } else {
      toast.error(res.data?.message || "Failed to register user");
    }
  };
  return (
    <Card className="w-full max-w-md rounded-[1.5rem] border border-slate-200/80 bg-white/95 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/85 dark:shadow-black/30">
      <CardHeader className="border-b border-slate-200/80 pb-5 dark:border-white/10">
        <div className="inline-flex w-fit items-center rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-700 dark:text-cyan-300">
          Create account
        </div>
        <CardTitle className="mt-3 text-2xl font-semibold">Sign Up</CardTitle>
        <CardDescription className="text-sm text-slate-600 dark:text-slate-400">
          Set up your account and start tracking your progress.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-5">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                placeholder="your@email.com"
                name="email"
                value={email}
                disabled={true}
                className="rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50"
              />
            </Field>
            <Field>
              <FieldLabel>User Name</FieldLabel>
              <Input
                type="text"
                placeholder="Choose a username"
                name="username"
                value={username}
                onChange={handleChange}
                className="rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50"
              />
            </Field>
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
          </FieldGroup>
          <Button className="mt-4 w-full rounded-full bg-cyan-600 text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400" onClick={handleSubmit}>
            Sign Up
          </Button>
        </FieldSet>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-slate-200/80 pt-4 dark:border-white/10">
        <Button variant="link" className="px-0 text-cyan-700 dark:text-cyan-300" onClick={() => setIsSignUp(false)}>
          Back to sign in
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUpform;
