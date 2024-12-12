"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../../controllers/shop/order-controller");
const router = express_1.default.Router();
router.post("/create", order_controller_1.createOrder);
router.post("/capture", order_controller_1.capturePayment);
router.get("/list/:userId", order_controller_1.getAllOrdersByUser);
router.get("/details/:id", order_controller_1.getOrderDetails);
exports.default = router;
