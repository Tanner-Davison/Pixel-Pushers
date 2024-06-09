const cloudinary = require("cloudinary").v2;

const cloudinarySecret = process.env.CLOUDINARY_SECRET;
const cloudApiKey = process.env.CLOUDINARY_API_KEY;

cloudinaryConfig = {
  cloud_name: "dezclgtpg",
  api_key: cloudApiKey,
  api_secret: cloudinarySecret,
  secure: true,
};

cloudinary.config(cloudinaryConfig)

module.exports={cloudinary}