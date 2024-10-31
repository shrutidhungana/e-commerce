import express, {Router } from "express";
import { registerUser, loginUser } from "../../controllers/auth/auth-controller";

const router: Router = express.Router();
router.post("/register", registerUser as express.RequestHandler);
router.post("/login", loginUser as express.RequestHandler);

export default router;
