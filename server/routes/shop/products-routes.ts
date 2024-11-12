import express, { Router } from "express";
import { getFilteredProducts } from "../../controllers/shop/products-controller";

const router: Router = express.Router();

router.get("/lists", getFilteredProducts as express.RequestHandler);

export default router;
