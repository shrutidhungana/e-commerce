"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../modals/User"));
// register
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const checkUser = await User_1.default.findOne({ email });
        if (checkUser) {
            return res.json({
                success: false,
                message: "User already exists with the same email! Please try again",
            });
        }
        const hashPassword = await bcryptjs_1.default.hash(password, 15);
        const newUser = new User_1.default({
            userName,
            email,
            password: hashPassword,
        });
        await newUser.save();
        return res.status(200).json({
            success: true,
            message: "Your registration is successful",
        });
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};
exports.registerUser = registerUser;
// login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User_1.default.findOne({ email });
        if (!checkUser) {
            return res.json({
                success: false,
                message: "User doesn't exist! Please register first",
            });
        }
        const checkPasswordMatch = await bcryptjs_1.default.compare(password, checkUser.password);
        if (!checkPasswordMatch) {
            return res.json({
                success: false,
                message: "Incorrect password! Please try again",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            userName: checkUser.userName,
        }, "CLIENT_SECRET_KEY", { expiresIn: "60m" });
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
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};
exports.loginUser = loginUser;
// logout
const logoutUser = async (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully!",
    });
};
exports.logoutUser = logoutUser;
// middleware
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user!",
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "CLIENT_SECRET_KEY");
        req.user = decoded; // Explicitly cast req
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized user!",
        });
    }
};
exports.authMiddleware = authMiddleware;
