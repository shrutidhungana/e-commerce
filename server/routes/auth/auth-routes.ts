import express, { Request, Response, Router } from "express";
import { registerUser } from "../../controllers/auth/auth-controller";

const router: Router = express.Router();

router.post("/register", (req: Request, res: Response) =>
  registerUser(req, res)
);

export default router;
