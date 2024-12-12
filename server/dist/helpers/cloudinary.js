"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUploadUtil = exports.upload = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? "",
    api_key: process.env.CLOUDINARY_API_KEY ?? "",
    api_secret: process.env.CLOUDINARY_API_SECRET ?? "",
});
const storage = multer_1.default.memoryStorage();
const imageUploadUtil = async (file) => {
    const result = await cloudinary_1.v2.uploader.upload(file, {
        resource_type: "auto",
    });
    return result;
};
exports.imageUploadUtil = imageUploadUtil;
const upload = (0, multer_1.default)({ storage });
exports.upload = upload;
