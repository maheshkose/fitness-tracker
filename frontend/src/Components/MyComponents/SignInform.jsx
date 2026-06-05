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


const SignInform = ({ email }) => {
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
    <div>
      <FieldSet>
        <FieldGroup>
         
          <Field>
            <FieldLabel>User Name</FieldLabel>

            <Input
              type="text"
              placeholder=""
              name="userName"
              value={userName}
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
         
        </FieldGroup>
        <Button className="w-full mt-4" onClick={handleSubmit}>
          Sign In
        </Button>
      </FieldSet>
    </div>
  );
};

export default SignInform;
