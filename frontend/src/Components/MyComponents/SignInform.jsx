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
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";


const SignInform = ({ email, setIsSignUp }) => {
  const navigate = useNavigate();
    const {loginUser} =  useAppContext();
  const [data, setData] = useState({
    email: "",
    userName: "",
    password: "",
    
  });
  const [showpassword, setshowpassword] = useState(false);
  const { userName, password } = data;

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const {email,userName,password} = data;
    if (!(email || userName) || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const res = await loginUser(data);
    if(res?.data?.success){
      toast.success(res.data.message);
      navigate("/");
    } else {
      toast.error(res.response?.data?.message || "Failed to login user");
    }
  };
  return (
    <Card className="w-full max-w-md rounded-[1.5rem] border border-slate-200/80 bg-white/95 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/85 dark:shadow-black/30">
      <CardHeader className="border-b border-slate-200/80 pb-5 dark:border-white/10">
        <div className="inline-flex w-fit items-center rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-700 dark:text-cyan-300">
          Welcome back
        </div>
        <CardTitle className="mt-3 text-2xl font-semibold">Sign In</CardTitle>
        <CardDescription className="text-sm text-slate-600 dark:text-slate-400">
          Enter your details to continue your fitness journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-5">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>User Name</FieldLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                name="userName"
                value={userName}
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
                Use at least 8 characters with uppercase, lowercase, a number and a symbol.
              </FieldDescription>
              <span>
                <BsEye
                  className="absolute right-3 top-[38px] cursor-pointer text-slate-500 dark:text-slate-300"
                  onClick={() => setshowpassword(!showpassword)}
                />
              </span>
            </Field>
          </FieldGroup>
          <Button className="mt-4 w-full rounded-full bg-cyan-600 text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400" onClick={handleSubmit}>
            Sign In
          </Button>
        </FieldSet>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-slate-200/80 pt-4 dark:border-white/10">
        <Button variant="link" className="px-0 text-cyan-700 dark:text-cyan-300" onClick={() => setIsSignUp(true)}>
          Create an account
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignInform;
