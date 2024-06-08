const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectToDatabase } = require("./database/database");
const { addUserToDatabase } = require("./database/addUserToDatabase");
const { newUser, userLogin, logout, authenticateUser } = require("./middleware/auth");
const { userDetails } = require("./middleware/user");
const { uploadProfilePhoto } = require("./middleware/cloudinaryController");

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

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

connectToDatabase().then((client) => {
  app.locals.db = client.db("PixelPushers");

  app.post("/pixel-pushers/usersignup", newUser, addUserToDatabase, (req, res) => {
    res.status(200).json({ message: "Login Success" });
    console.log('sign up succsess');
  });

  app.post("/pixel-pushers/userlogin", userLogin);

  app.get("/pixel-pushers/home", authenticateUser, userDetails);

  app.post("/pixel-pushers/logout", authenticateUser,logout)
  
  app.get("/pixel-pushers/userData", authenticateUser, userDetails, async (req, res) => {
    const user = { userId: req.user };
    console.log(user);
  
    res.json({ user: req.user });
  });
  
  app.post("/pixel-pushers/uploadProfilePhoto", authenticateUser, uploadProfilePhoto);

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
