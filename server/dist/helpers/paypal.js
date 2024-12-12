"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
paypal_rest_sdk_1.default.configure({
    mode: process.env.PAYPAL_MODE ?? "sandbox",
    client_id: process.env.PAYPAL_CLIENT_ID ?? "",
    client_secret: process.env.PAYPAL_CLIENT_SECRET ?? "",
});
exports.default = paypal_rest_sdk_1.default;
