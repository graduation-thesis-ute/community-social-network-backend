import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    public_id: "zalo-ute/" + file.originalname,
    resource_type: "auto",
    allowed_formats: ["jpg", "png", "jpeg"],
    format: "jpg",
  }),
});

const upload = multer({ storage });

export default upload;
