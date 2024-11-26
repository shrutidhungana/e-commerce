import express, { RequestHandler, Router } from "express";
import {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
} from "../../controllers/shop/order-controller";

const router: Router = express.Router();

router.post("/create", createOrder as RequestHandler);
router.post("/capture", capturePayment as RequestHandler);
router.get("/list/:userId", getAllOrdersByUser as RequestHandler);
router.get("/details/:id", getOrderDetails as RequestHandler);

export default router;
