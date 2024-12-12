"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feature_controller_1 = require("../../controllers/common/feature-controller");
const router = express_1.default.Router();
router.post("/add", feature_controller_1.addFeatureImage);
router.get("/lists", feature_controller_1.getFeatureImages);
router.delete("/delete/:id", feature_controller_1.deleteFeatureImage);
exports.default = router;
