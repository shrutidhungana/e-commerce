import Feature from "../../modals/Feature";
import { Request, Response } from "express";

// Add Feature Image
const addFeatureImage = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const { image } = req.body;

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
      message: "Successfully added feature images.",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Get Feature Images
const getFeatureImages = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Edit Feature Image
const editFeatureImage = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    const updatedFeature = await Feature.findByIdAndUpdate(
      id,
      { image },
      { new: true } // Return the updated document
    );

    if (!updatedFeature) {
      return res.status(404).json({
        success: false,
        message: "Feature image not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedFeature,
      message: "Successfully updated feature image.",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Delete Feature Image
const deleteFeatureImage = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const { id } = req.params;

    const deletedFeature = await Feature.findByIdAndDelete(id);

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
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

export {
  addFeatureImage,
  getFeatureImages,
  editFeatureImage,
  deleteFeatureImage,
};
