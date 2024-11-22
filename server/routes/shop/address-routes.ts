import express, {Router} from "express";
import {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} from "../../controllers/shop/address-controller";

const router: Router = express.Router();

router.post("/add", addAddress as express.RequestHandler);
router.get("/lists/:userId", fetchAllAddress as  express.RequestHandler);
router.delete(
  "/delete/:userId/:addressId",
  deleteAddress as express.RequestHandler
);
router.put("/update/:userId/:addressId", editAddress as express.RequestHandler);

export default router;
