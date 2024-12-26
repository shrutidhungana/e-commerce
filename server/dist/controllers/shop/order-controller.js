"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderDetails = exports.getAllOrdersByUser = exports.capturePayment = exports.createOrder = void 0;
const paypal_1 = __importDefault(require("../../helpers/paypal"));
const Order_1 = __importDefault(require("../../modals/Order"));
const Cart_1 = __importDefault(require("../../modals/Cart"));
const Product_1 = __importDefault(require("../../modals/Product"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createOrder = async (req, res) => {
    try {
        const { userId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount, orderDate, orderUpdateDate, paymentId, payerId, cartId, } = req.body;
        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal",
            },
            redirect_urls: {
                return_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-return`,
                cancel_url: `${process.env.CLIENT_BASE_URL}shop/paypal-cancel`,
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map((item) => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: "USD",
                            quantity: item.quantity,
                        })),
                    },
                    amount: {
                        currency: "USD",
                        total: totalAmount.toFixed(2),
                    },
                    description: "description",
                },
            ],
        };
        paypal_1.default.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: "Error while creating paypal payment",
                });
            }
            else {
                const newlyCreatedOrder = new Order_1.default({
                    userId,
                    cartId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId,
                });
                await newlyCreatedOrder.save();
                const approvalLink = paymentInfo.links?.find((link) => link.rel === "approval_url");
                if (!approvalLink) {
                    return res.status(500).json({
                        success: false,
                        message: "No approval URL returned by PayPal",
                    });
                }
                const approvalURL = approvalLink.href;
                res.status(201).json({
                    success: true,
                    approvalURL,
                    orderId: newlyCreatedOrder._id,
                    message: "Payment created successfully!"
                });
            }
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Some error occurred!",
        });
    }
};
exports.createOrder = createOrder;
const capturePayment = async (req, res) => {
    try {
        const { paymentId, payerId, orderId } = req.body;
        let order = await Order_1.default.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order can not be found",
            });
        }
        order.paymentStatus = "paid";
        order.orderStatus = "confirmed";
        order.paymentId = paymentId;
        order.payerId = payerId;
        for (let item of order.cartItems) {
            let product = await Product_1.default.findById(item.productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product not found for item with ID: ${item.productId}`,
                });
            }
            if (product.totalStock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Not enough stock for the product: ${product.title}`,
                });
            }
            product.totalStock -= item.quantity;
            await product.save();
        }
        const getCartId = order.cartId;
        await Cart_1.default.findByIdAndDelete(getCartId);
        await order.save();
        res.status(200).json({
            success: true,
            message: "Order confirmed",
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
exports.capturePayment = capturePayment;
const getAllOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order_1.default.find({ userId });
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
exports.getAllOrdersByUser = getAllOrdersByUser;
const getOrderDetails = async (req, res) => {
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
exports.getOrderDetails = getOrderDetails;
