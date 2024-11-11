import express, { Router, Request, Response, NextFunction } from "express";
import { handleImageUpload } from "../../controllers/admin/products-controller";
import { upload } from "../../helpers/cloudinary";

const router: Router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload as express.RequestHandler);

export default router;