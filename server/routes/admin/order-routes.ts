import express, { Router } from "express";
import {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "../../controllers/admin/order-controller";

const router: Router = express.Router();

router.get("/lists", getAllOrdersOfAllUsers as express.RequestHandler);
router.get("/details/:id", getOrderDetailsForAdmin as express.RequestHandler);
router.put("/update/:id", updateOrderStatus as express.RequestHandler);


export default router;
