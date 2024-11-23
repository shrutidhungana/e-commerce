import { v2 as cloudinary } from "cloudinary";
import multer from "multer";


// Configure Cloudinary
cloudinary.config({
  cloud_name: "",
  api_key: "",
  api_secret: "",
});

const storage = multer.memoryStorage();

const imageUploadUtil = async (file: string) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
};

const upload = multer({ storage });

export { upload, imageUploadUtil };
