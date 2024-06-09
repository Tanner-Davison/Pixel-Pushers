const { ObjectId } = require("mongodb");
const {cloudinary }= require('../Cloudinary/cloudinaryConfig'); 

const uploadProfilePhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const file  = req.file.path; 
    const uploadResult = await cloudinary.uploader.upload(file, {
      folder: "pixel_pushers_profile_photos",
      upload_preset:'profile_photos',
      public_id: req.user.userId,
      overwrite: true,
    });

    const db = req.app.locals.db;
    const usersCollection = db.collection("users");
    const objectId = new ObjectId(req.user.userId);

    await usersCollection.updateOne(
      { _id: objectId },
      { $set: { profileImageUrl: uploadResult.secure_url } }
    );

    req.user = { ...req.user, profileImageUrl: uploadResult.secure_url };

    res.json({
      message: "Profile photo uploaded successfully",
      profileImageUrl: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    res.status(500).json({ message: "Error uploading photo" });
  }
};

module.exports = { uploadProfilePhoto };
