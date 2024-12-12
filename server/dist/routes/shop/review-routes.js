"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_review_controller_1 = require("../../controllers/shop/product-review-controller");
const router = express_1.default.Router();
router.post("/add", product_review_controller_1.addProductReview);
router.get("/:productId", product_review_controller_1.getProductReviews);
exports.default = router;
