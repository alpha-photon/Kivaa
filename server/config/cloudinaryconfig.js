import { config, uploader } from "cloudinary";
import { config as _config } from "dotenv";
_config();
const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  next();
};
export  { cloudinaryConfig, uploader };
