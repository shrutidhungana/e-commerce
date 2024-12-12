"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeatureImage = exports.getFeatureImages = exports.addFeatureImage = void 0;
const Feature_1 = __importDefault(require("../../modals/Feature"));
// Add Feature Image
const addFeatureImage = async (req, res) => {
    try {
        const { image } = req.body;
        const featureImages = new Feature_1.default({
            image,
        });
        await featureImages.save();
        res.status(201).json({
            success: true,
            data: featureImages,
            message: "Successfully added feature images.",
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred!",
        });
    }
};
exports.addFeatureImage = addFeatureImage;
// Get Feature Images
const getFeatureImages = async (req, res) => {
    try {
        const images = await Feature_1.default.find({});
        res.status(200).json({
            success: true,
            data: images,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred!",
        });
    }
};
exports.getFeatureImages = getFeatureImages;
// Delete Feature Image
const deleteFeatureImage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFeature = await Feature_1.default.findByIdAndDelete(id);
        if (!deletedFeature) {
            return res.status(404).json({
                success: false,
                message: "Feature image not found!",
            });
        }
        res.status(200).json({
            success: true,
            data: deletedFeature,
            message: "Successfully deleted feature image.",
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Some error occurred!",
        });
    }
};
exports.deleteFeatureImage = deleteFeatureImage;
