const express = require("express");
const cors = require("cors");
const fs = require('fs');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const { connectToDatabase } = require("./Database/database");
const userRouter = require('./Routes/user');
const uploadRouter = require('./Routes/upload');
const PORT = process.env.PORT || 3001;

try {
  fs.mkdirSync('uploads', { recursive: true });
  console.log("Uploads directory created successfully");
} catch (err) {
  console.error("Error creating uploads directory:", err);
}

const app = express();

//Middleware 
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cors({origin: "http://localhost:5173",credentials: true}));
app.use(cookieParser());

//


connectToDatabase().then((client) => {
  app.locals.db = client.db("PixelPushers");
  
  app.use('/pixel-pushers/user', userRouter); 
  app.use('/pixel-pushers/upload', uploadRouter); 
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
