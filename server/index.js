const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectToDatabase } = require("./Database/database");
const { addUserToDatabase } = require("./Database/addUserToDatabase");
const { userLogin, logout, userDetails } = require("./Controllers/UserController");
const {authenticate,verifyNewUserData} = require('./Middleware/auth')
const { uploadProfilePhoto } = require("./Controllers/cloudinaryController");
const PORT = process.env.PORT || 3001;


const app = express();

//Middleware 
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(cors({origin: "*",credentials: true}));
app.use(cookieParser());
//


connectToDatabase().then((client) => {
  app.locals.db = client.db("PixelPushers");

  app.post("/pixel-pushers/usersignup", verifyNewUserData, addUserToDatabase)

  app.post("/pixel-pushers/userlogin", userLogin);

  app.post("/pixel-pushers/logout", authenticate,logout)
  
  app.get("/pixel-pushers/userData", authenticate, userDetails);

  app.post("/pixel-pushers/uploadProfilePhoto", authenticate, uploadProfilePhoto);

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
