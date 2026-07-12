import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User"


// register a user
export const registerUser = async (req: Request, res: Response) =>{
  const {name, email, password} = req.body;
  if(!name || !email || !password){
    return res.status(400).json({message: "Please provide all required fields"})
  }
  // Here you would typically create the user in the database
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({name, email, password});
    res.status(201).json({message: "User registered successfully", user});
  } catch (error) {
    res.status(500).json({message: "Error registering user"});
  }

}

export const loginUser = async (req: Request, res: Response) =>{
  const {email, password} = req.body;
  if(!email || !password){
    return res.status(400).json({message: "Please provide all required fields"})
  }
  try{
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message: "Invalid credentials"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message: "Invalid credentials"})
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: "1h"});
    res.status(200).json({message: "User logged in successfully", token});
  } catch (error) {
    res.status(500).json({message: "Error logging in"})
  }
}

export const logoutUser = async (req: Request, res: Response) =>{
  try {
    const authHeader = req.headers["authorization"];
    let token : any = authHeader && authHeader.split(" ")[1];
    if(!token){
      return res.status(401).json({message: "No token provided"})
    }
    // Here you would typically invalidate the token in your database or token store
    token = null; 

  } catch (err) {
    res.status(500).json({message: "Error logging out", error: err})
  }
}