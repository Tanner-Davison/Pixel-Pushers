const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectToDatabase } = require("./database/database");
const { addUserToDatabase } = require("./database/addUserToDatabase");
const { newUser, userLogin, authenticateUser } = require("./middleware/auth");
const PORT = process.env.PORT || 3001;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); 

const app = express();
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
    res.json({ message: 'Login successful', user: req.user });
  });

  app.get('/api/private', authenticateUser, async (req, res) => {
    try {
      const userId = req.user.userId; 
      console.log("USER ID", userId); 

      const db = req.app.locals.db;
      const usersCollection = db.collection('users');
     
      const objectId = new ObjectId(userId); 

      const user = await usersCollection.findOne({ _id: objectId }); 

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Error retrieving data' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});