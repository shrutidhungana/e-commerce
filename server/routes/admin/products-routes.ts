import express, { Router } from "express";
import {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
} from "../../controllers/admin/products-controller";
import { upload } from "../../helpers/cloudinary";

const router: Router = express.Router();

router.post(
  "/upload-image",
  upload.single("my_file"),
  handleImageUpload as express.RequestHandler
);
router.post("/add", addProduct as express.RequestHandler)
router.get("/lists", fetchAllProducts as express.RequestHandler);
router.put("/edit/:id", editProduct as express.RequestHandler);
router.delete("/delete/:id", deleteProduct as express.RequestHandler);

export default router;
