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

const SignUpform = ({ email }) => {
    const {registerUser} =  ProvideAppContext();
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
    } else {
      toast.error(res.response?.data?.message || "Failed to register user");
    }
  };
  return (
    <div>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>

            <Input
              type="email"
              placeholder=""
              name="email"
              value={email}
              disabled={true}
            />
          </Field>
          <Field>
            <FieldLabel>User Name</FieldLabel>

            <Input
              type="text"
              placeholder=""
              name="username"
              value={username}
              onChange={handleChange}
            />
          </Field>
          <Field className="relative">
            <FieldLabel>Password</FieldLabel>

            <Input
              type={showpassword ? "text" : "password"}
              placeholder=""
              name="password"
              value={password}
              onChange={handleChange}
            />
            <FieldDescription>
              Must be at least 8 characters long. mustContain uppercase
              character lowercase character number and symbol
            </FieldDescription>
            <span>
              <BsEye
                className="absolute right-3 top-[38px] cursor-pointer"
                onClick={() => setshowpassword(!showpassword)}
              />
            </span>
          </Field>
          <Field className="relative">
            <FieldLabel>Confirm Password</FieldLabel>

            <Input
              type={showpassword ? "text" : "password"}
              placeholder=""
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
            <span>
              <BsEye
                className="absolute right-3 top-[38px] cursor-pointer"
                onClick={() => setshowpassword(!showpassword)}
              />
            </span>
          </Field>
        </FieldGroup>
        <Button className="w-full mt-4" onClick={handleSubmit}>
          Sign Up
        </Button>
      </FieldSet>
    </div>
  );
};

export default SignUpform;
