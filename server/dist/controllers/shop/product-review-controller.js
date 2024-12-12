"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductReviews = exports.addProductReview = void 0;
const Order_1 = __importDefault(require("../../modals/Order"));
const Product_1 = __importDefault(require("../../modals/Product"));
const Review_1 = __importDefault(require("../../modals/Review"));
const addProductReview = async (req, res) => {
    try {
        const { productId, userId, userName, reviewMessage, reviewValue } = req.body;
        const order = await Order_1.default.findOne({
            userId,
            "cartItems.productId": productId,
            // orderStatus: "confirmed" || "delivered",
        });
        if (!order) {
            return res.status(403).json({
                success: false,
                message: "You need to purchase product to review it.",
            });
        }
        const checkExistinfReview = await Review_1.default.findOne({
            productId,
            userId,
        });
        if (checkExistinfReview) {
            return res.status(400).json({
                success: false,
                message: "You already reviewed this product!",
            });
        }
        const newReview = new Review_1.default({
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue,
        });
        await newReview.save();
        const reviews = await Review_1.default.find({ productId });
        const totalReviewsLength = reviews.length;
        const averageReview = reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
            totalReviewsLength;
        await Product_1.default.findByIdAndUpdate(productId, { averageReview });
        res.status(201).json({
            success: true,
            data: newReview,
            message: "Review Added Successfully!"
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};
exports.addProductReview = addProductReview;
const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review_1.default.find({ productId });
        res.status(200).json({
            success: true,
            data: reviews,
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};
exports.getProductReviews = getProductReviews;
