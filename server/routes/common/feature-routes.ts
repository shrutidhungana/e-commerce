import express, { Router } from "express";
import { addFeatureImage, getFeatureImages } from "../../controllers/common/feature-controller";


const router: Router = express.Router();

router.post("/add", addFeatureImage as express.RequestHandler);
router.get("/lists", getFeatureImages as express.RequestHandler);


export default router;