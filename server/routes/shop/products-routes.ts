import express, { Router } from "express";
import {
  getFilteredProducts,
  getProductDetails,
} from "../../controllers/shop/products-controller";

const router: Router = express.Router();

router.get("/lists", getFilteredProducts as express.RequestHandler);
router.get("/lists/:id", getProductDetails as express.RequestHandler)

export default router;
