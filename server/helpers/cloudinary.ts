import { v2 as cloudinary } from "cloudinary";
import multer from "multer";


// Configure Cloudinary
cloudinary.config({
  cloud_name: "dmon20gzb",
  api_key: "593587143943919",
  api_secret: "PMgINIzZZpNE3NEjohFHzSRqbyU",
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
