"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("../../controllers/admin/products-controller");
const cloudinary_1 = require("../../helpers/cloudinary");
const router = express_1.default.Router();
router.post("/upload-image", cloudinary_1.upload.single("my_file"), products_controller_1.handleImageUpload);
router.post("/add", products_controller_1.addProduct);
router.get("/lists", products_controller_1.fetchAllProducts);
router.put("/edit/:id", products_controller_1.editProduct);
router.delete("/delete/:id", products_controller_1.deleteProduct);
exports.default = router;
