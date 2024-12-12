"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = void 0;
const Product_1 = __importDefault(require("../../modals/Product"));
const searchProducts = async (req, res) => {
    try {
        const { keyword } = req.params;
        if (!keyword || typeof keyword !== "string") {
            return res.status(400).json({
                succes: false,
                message: "Keyword is required and must be in string format",
            });
        }
        const regEx = new RegExp(`\\b${keyword}\\b`, "i");
        const createSearchQuery = {
            $or: [
                { title: regEx },
                { description: regEx },
                { category: regEx },
                { brand: regEx },
            ],
        };
        const searchResults = await Product_1.default.find(createSearchQuery);
        res.status(200).json({
            success: true,
            data: searchResults,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};
exports.searchProducts = searchProducts;
