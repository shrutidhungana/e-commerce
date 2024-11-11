import { imageUploadUtil } from "../../helpers/cloudinary";
import { Request, Response } from "express";


const handleImageUpload = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
    try {
      // Check if `req.file` exists
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const url = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await imageUploadUtil(url);

      res.json({
        success: true,
        result,
        message: "Image Uploaded Successfully",
      });
    } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

export {handleImageUpload}