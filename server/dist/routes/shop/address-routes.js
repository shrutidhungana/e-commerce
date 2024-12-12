"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const address_controller_1 = require("../../controllers/shop/address-controller");
const router = express_1.default.Router();
router.post("/add", address_controller_1.addAddress);
router.get("/lists/:userId", address_controller_1.fetchAllAddress);
router.delete("/delete/:userId/:addressId", address_controller_1.deleteAddress);
router.put("/update/:userId/:addressId", address_controller_1.editAddress);
exports.default = router;
