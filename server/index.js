const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { connectToDatabase } = require("./database/database");
const { addUserToDatabase } = require("./database/addUserToDatabase");
const { newUser, userLogin, authenticateUser } = require("./middleware/auth");
const { userDetails } = require("./middleware/userInfo");
const PORT = process.env.PORT || 3001;
const cloudApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinarySecret = process.env.CLOUDINARY_SECRET;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dezclgtpg",
  api_key: cloudApiKey,
  api_secret: cloudinarySecret,
  secure: true,
});
console.log(cloudinary.config());
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

connectToDatabase().then((client) => {
  app.locals.db = client.db("PixelPushers");

  app.get("/api", (req, res, next) => {
    res.json({ message: "Hello from the server!" });
  });

  app.post("/api/usersignup", newUser, addUserToDatabase, (req, res) => {
    res.status(200).json({ message: "Login Success" });
    console.log(req.body);
  });

  app.post("/api/userlogin", userLogin, (req, res) => {
    res.json({ message: "Login successful", user: req.user });
  });

  app.get("/api/home", authenticateUser, async (req, res) => {
    try {
      const userId = req.user.userId;
      console.log("USER ID", userId);

      const db = req.app.locals.db;
      const usersCollection = db.collection("users");

      const objectId = new ObjectId(userId);

      const user = await usersCollection.findOne({ _id: objectId });

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ message: "Error retrieving data" });
    }
  });
});
app.post("/api/logout", authenticateUser, async (req, res) => {
  const user = { userId: req.user.userId };
  console.log(user.userId);
  res.clearCookie("jwtToken");
  res.json({ message: "user logged out successfuly" });
});
app.get("/api/userData", authenticateUser, userDetails, async (req, res) => {
  const user = { userId: req.user };
  console.log(user);

  res.json({ user: req.user });
});

app.post("/api/uploadProfilePhoto", authenticateUser, async (req, res) => {
  try {
    const { profilePhoto } = req.body;

    // Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(profilePhoto, {
      folder: "pixel_pushers_profile_photos", // Optional: Specify a folder for organizing photos
      public_id: req.user.userId, // Use the user's ID for unique file names
      overwrite: true, // Overwrite if a file with the same ID exists
    });

    // Update the user's profile picture URL in your database
    const db = req.app.locals.db;
    const usersCollection = db.collection("users");
    const objectId = new ObjectId(req.user.userId);

    await usersCollection.updateOne(
      { _id: objectId },
      { $set: { profileImageUrl: uploadResult.secure_url } }
    );
    console.log(uploadResult.secure_url);
    // Send a success response
    res.json({
      message: "Profile photo uploaded successfully",
      profileImageUrl: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    res.status(500).json({ message: "Error uploading photo" });
  }
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
