import express, { Router } from "express";
import { addFeatureImage, getFeatureImages,deleteFeatureImage,editFeatureImage } from "../../controllers/common/feature-controller";


const router: Router = express.Router();

router.post("/add", addFeatureImage as express.RequestHandler);
router.get("/lists", getFeatureImages as express.RequestHandler);
router.put("/update/:id", editFeatureImage as express.RequestHandler);
router.delete("/delete/:id", deleteFeatureImage as express.RequestHandler);


export default router;