import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configure Cloudinary storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "nono",
      resource_type: "auto",
      allowed_formats: ["jpeg", "png", "jpg", "mp3", "mp4", "mov"],
      transformation: [{ width: 500, height: 500, crop: "fill" }],
      public_id: file.originalname,
    };
  },
});

// Initialize multer middleware with Cloudinary storage engine
const upload = multer({ storage: storage });

export {upload} ;
