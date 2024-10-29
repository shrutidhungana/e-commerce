import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../modals/User";
import { Request, Response } from "express";

// register
const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { userName, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 15);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Your registration is successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// login
const login = async (req:Request, res:Response):Promise<void> => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// logout

// middleware

export {registerUser}
