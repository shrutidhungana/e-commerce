import express, { Router } from "express";
import { searchProducts } from "../../controllers/shop/search-controller";


const router: Router = express.Router();

router.get("/:keyword", searchProducts as express.RequestHandler);

export default router;