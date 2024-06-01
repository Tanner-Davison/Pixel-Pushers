const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET_KEY;

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const newUser = (req, res, next) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    return res
      .status(400)
      .json({ message: "First Name, Last Name, and Email are required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid Email" });
  }
  next();
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!isValidEmail(email) || !password) {
    res.status(402).json({ message: "missing email and or password" });
    return;
  }

  try {
    const db = req.app.locals.db;
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = {
      userId: user._id.toString(),
      email: user.email.toString(),
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });

    res.cookie("jwtToken", token, {
      httpOnly: true,
      sameSite: "lax",

    });

    // Decode the JWT to get user data
    const decoded = jwt.verify(token, secretKey);

    // Set req.user with decoded data
    req.user = { userId: decoded.userId, email: decoded.email };

    next();
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};
const authenticateUser = (req, res, next) => {
  console.log('running');

  const token = req.cookies.jwtToken; // Get token from cookies
  console.log(token); 

  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      // Set req.user here *after* successful verification
      req.user = { userId: decoded.userId, email: decoded.email }; 
      next(); 
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
module.exports = {
  newUser,
  userLogin,
  authenticateUser,
};
