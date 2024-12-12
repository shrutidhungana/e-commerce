"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../../controllers/auth/auth-controller");
const router = express_1.default.Router();
// Register, Login, and Logout routes
router.post("/register", auth_controller_1.registerUser);
router.post("/login", auth_controller_1.loginUser);
router.post("/logout", auth_controller_1.logoutUser);
// Check auth route with extended request type
router.get("/check-auth", auth_controller_1.authMiddleware, (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated user!",
        user,
    });
});
exports.default = router;
