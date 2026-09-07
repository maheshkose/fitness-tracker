import jwt from "jsonwebtoken";
import { model, Schema } from "mongoose";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

export const isValidPassword = (password) => {
  return typeof password === "string" && passwordRegex.test(password) && password.length >= 8;
};

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
    /^[A-Za-z0-9._%+-]+@gmail\.com$/i,
    "Please enter a valid email address"
  ]
  },
  name: {
    type: String,
    minLength: [3, "Name must contain at least 3 characters"],
    required: true
  },
  userName: {
    type: String,
    unique: true,
    required: true,
    match: [
    /^[A-Za-z][A-Za-z0-9]*$/,
    "Username must start with a letter and contain only letters and numbers (no spaces or special characters)"
  ]
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 8 characters"],
    select: false,
    validate: {
      validator: isValidPassword,
      message: "Password must contain uppercase, lowercase, number, and special character"
    }
  }
}, { timestamps: true });



userSchema.methods.generateJwtToken = async function () {
  const token = await jwt.sign(
    {
      id: this.id,
      email: this.email,
    },
    process.env.JWT_SCERET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
  // console.log("tokenm",token);
  return token;
  
};


const User = model("User", userSchema);

export default User;