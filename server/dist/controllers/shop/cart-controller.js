"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartItems = exports.updateCartItemQuantity = exports.fetchCartItems = exports.addToCart = void 0;
const Cart_1 = __importDefault(require("../../modals/Cart"));
const Product_1 = __importDefault(require("../../modals/Product"));
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided!'
            });
        }
        const product = await Product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found!",
            });
        }
        let cart = await Cart_1.default.findOne({ userId });
        if (!cart) {
            cart = new Cart_1.default({ userId, items: [] });
        }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity });
        }
        else {
            cart.items[findCurrentProductIndex].quantity += quantity;
        }
        await cart.save();
        res.status(200).json({
            success: true,
            data: cart,
            message: 'Successfully added items to cart.'
        });
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};
exports.addToCart = addToCart;
const fetchCartItems = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is manadatory!",
            });
        }
        const cart = await Cart_1.default.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice",
        });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!",
            });
        }
        const validItems = cart.items.filter((productItem) => productItem.productId);
        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }
        const populateCartItems = validItems.map((item) => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        }));
        res.status(200).json({
            success: true,
            data: {
                ...cart.toObject(),
                items: populateCartItems,
            },
        });
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};
exports.fetchCartItems = fetchCartItems;
const updateCartItemQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }
        const cart = await Cart_1.default.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!",
            });
        }
        const findCurrentProductIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Cart item not present !",
            });
        }
        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();
        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice",
        });
        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));
        res.status(200).json({
            success: true,
            data: {
                ...cart.toObject(),
                items: populateCartItems,
            },
            message: "Successfully updated cart items.",
        });
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};
exports.updateCartItemQuantity = updateCartItemQuantity;
const deleteCartItems = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }
        const cart = await Cart_1.default.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice",
        });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!",
            });
        }
        cart.items = cart.items.filter((item) => item.productId._id.toString() !== productId);
        await cart.save();
        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice",
        });
        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));
        res.status(200).json({
            success: true,
            data: {
                ...cart.toObject(),
                items: populateCartItems,
            },
            message: "Successfully deleted cart item."
        });
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};
exports.deleteCartItems = deleteCartItems;
