import express, { Router, Request, Response, NextFunction } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} from "../../controllers/auth/auth-controller";

interface ExtendedRequest extends Request {
  user?: {
    id: string;
    role: string;
    email: string;
    userName: string;
  };
}

const router: Router = express.Router();

// Register, Login, and Logout routes
router.post("/register", registerUser as express.RequestHandler);
router.post("/login", loginUser as express.RequestHandler);
router.post("/logout", logoutUser as express.RequestHandler);

// Check auth route with extended request type
router.get(
  "/check-auth",
  authMiddleware as express.RequestHandler,
  (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "Authenticated user!",
      user,
    });
  }
);

export default router;
