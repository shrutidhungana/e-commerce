import express, { Router } from "express";
import { addProductReview, getProductReviews } from "../../controllers/shop/product-review-controller";

const router: Router = express.Router();

router.post("/add", addProductReview as express.RequestHandler);
router.get("/:productId", getProductReviews as express.RequestHandler);


export default router;