"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../../controllers/shop/cart-controller");
const router = express_1.default.Router();
router.post("/add", cart_controller_1.addToCart);
router.get("/lists/:userId", cart_controller_1.fetchCartItems);
router.put("/update-cart", cart_controller_1.updateCartItemQuantity);
router.delete("/:userId/:productId", cart_controller_1.deleteCartItems);
exports.default = router;
