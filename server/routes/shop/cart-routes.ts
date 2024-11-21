import express, { Router } from "express";
import {
  addToCart,
  fetchCartItems,
  deleteCartItems,
  updateCartItemQuantity,
} from "../../controllers/shop/cart-controller";

const router: Router = express.Router();

router.post("/add", addToCart as express.RequestHandler);
router.get("/lists/:userId", fetchCartItems as express.RequestHandler);
router.put("/update-cart", updateCartItemQuantity as express.RequestHandler);
router.delete("/:userId/:productId", deleteCartItems as express.RequestHandler)
