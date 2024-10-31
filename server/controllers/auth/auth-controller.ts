import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../modals/User";
import { Request, Response, NextFunction } from "express";

interface ExtendedRequest extends Request {
  user?: {
    id: string;
    role: string;
    email: string;
    userName: string;
  };
}

// register
const registerUser = async (req: ExtendedRequest, res: Response): Promise<void | Response> => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists with the same email! Please try again",
      });
    }

    const hashPassword = await bcrypt.hash(password, 15);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "Your registration is successful",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// login
const loginUser = async (req: Request, res: Response): Promise<void | Response> => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    return res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// logout
const logoutUser = async (req: Request, res: Response): Promise<void | Response> => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};


// middleware
const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY") as { id: string; role: string; email: string; userName: string };
    (req as Request & { user: typeof decoded }).user = decoded; // Explicitly cast req
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }

};


export {registerUser, loginUser, logoutUser, authMiddleware}
