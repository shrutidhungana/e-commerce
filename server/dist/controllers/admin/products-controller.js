"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.editProduct = exports.fetchAllProducts = exports.addProduct = exports.handleImageUpload = void 0;
const cloudinary_1 = require("../../helpers/cloudinary");
const Product_1 = __importDefault(require("../../modals/Product"));
const handleImageUpload = async (req, res) => {
    try {
        // Check if `req.file` exists
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await (0, cloudinary_1.imageUploadUtil)(url);
        res.json({
            success: true,
            result,
            message: "Image Uploaded Successfully",
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: "Error occured",
        });
    }
};
exports.handleImageUpload = handleImageUpload;
// add a new product
const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock, averageReview, } = req.body;
        const newlyCreatedProduct = new Product_1.default({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            averageReview,
        });
        await newlyCreatedProduct.save();
        res.status(201).json({
            success: true,
            data: newlyCreatedProduct,
            message: "Product Added Successfully",
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
};
exports.addProduct = addProduct;
// fetch all products
const fetchAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Product_1.default.find({});
        res.status(200).json({
            success: true,
            data: listOfProducts,
            message: "All the products are received successfully",
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
};
exports.fetchAllProducts = fetchAllProducts;
// edit a product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, description, category, brand, price, salePrice, totalStock, averageReview, } = req.body;
        let findProduct = await Product_1.default.findById(id);
        if (!findProduct)
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price === "" ? 0 : price || findProduct.price;
        findProduct.salePrice =
            salePrice === "" ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        findProduct.image = image || findProduct.image;
        findProduct.averageReview = averageReview || findProduct.averageReview;
        await findProduct.save();
        res.status(200).json({
            success: true,
            data: findProduct,
            message: "Product is updated successfully.",
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
};
exports.editProduct = editProduct;
// delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_1.default.findByIdAndDelete(id);
        if (!product)
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
};
exports.deleteProduct = deleteProduct;
