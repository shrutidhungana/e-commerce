"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductDetails = exports.getFilteredProducts = void 0;
const Product_1 = __importDefault(require("../../modals/Product"));
const getFilteredProducts = async (req, res) => {
    try {
        const { category = "", brand = "", sortBy = "price-lowtohigh" } = req.query;
        // Define filters as an object with string keys and any values
        let filters = {};
        if (category) {
            filters.category = { $in: category.toString().split(",") };
        }
        if (brand) {
            filters.brand = { $in: brand.toString().split(",") };
        }
        let sort = {};
        switch (sortBy) {
            case "price-lowtohigh":
                sort.price = 1;
                break;
            case "price-hightolow":
                sort.price = -1;
                break;
            case "title-atoz":
                sort.title = 1;
                break;
            case "title-ztoa":
                sort.title = -1;
                break;
            default:
                sort.price = 1;
                break;
        }
        const products = await Product_1.default.find(filters).sort(sort);
        return res.status(200).json({
            success: true,
            data: products,
            message: "Successfully rendered products"
        });
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};
exports.getFilteredProducts = getFilteredProducts;
const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_1.default.findById(id);
        if (!product)
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        res.status(200).json({
            success: true,
            data: product,
            message: "Rendered details of product successfully."
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};
exports.getProductDetails = getProductDetails;
