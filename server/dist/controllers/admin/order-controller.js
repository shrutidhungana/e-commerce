"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrderDetailsForAdmin = exports.getAllOrdersOfAllUsers = void 0;
const Order_1 = __importDefault(require("../../modals/Order"));
const getAllOrdersOfAllUsers = async (req, res) => {
    try {
        const orders = await Order_1.default.find({});
        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "No orders found!",
            });
        }
        res.status(200).json({
            success: true,
            data: orders,
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};
exports.getAllOrdersOfAllUsers = getAllOrdersOfAllUsers;
const getOrderDetailsForAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order_1.default.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found!",
            });
        }
        res.status(200).json({
            success: true,
            data: order,
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};
exports.getOrderDetailsForAdmin = getOrderDetailsForAdmin;
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;
        const order = await Order_1.default.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found!",
            });
        }
        await Order_1.default.findByIdAndUpdate(id, { orderStatus });
        res.status(200).json({
            success: true,
            message: "Order status is updated successfully!",
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};
exports.updateOrderStatus = updateOrderStatus;
