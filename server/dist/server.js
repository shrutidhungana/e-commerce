"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth/auth-routes"));
const products_routes_1 = __importDefault(require("./routes/admin/products-routes"));
const order_routes_1 = __importDefault(require("./routes/admin/order-routes"));
const products_routes_2 = __importDefault(require("./routes/shop/products-routes"));
const cart_routes_1 = __importDefault(require("./routes/shop/cart-routes"));
const address_routes_1 = __importDefault(require("./routes/shop/address-routes"));
const order_routes_2 = __importDefault(require("./routes/shop/order-routes"));
const search_routes_1 = __importDefault(require("./routes/shop/search-routes"));
const review_routes_1 = __importDefault(require("./routes/shop/review-routes"));
const feature_routes_1 = __importDefault(require("./routes/common/feature-routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGO_URI ?? "";
mongoose_1.default
    .connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 5000;
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
    ],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/admin/products", products_routes_1.default);
app.use("/api/admin/orders", order_routes_1.default);
app.use("/api/shop/products", products_routes_2.default);
app.use("/api/shop/cart", cart_routes_1.default);
app.use("/api/shop/address", address_routes_1.default);
app.use("/api/shop/order", order_routes_2.default);
app.use("/api/shop/search", search_routes_1.default);
app.use("/api/shop/review", review_routes_1.default);
app.use("/api/common/feature", feature_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
