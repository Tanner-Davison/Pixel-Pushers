const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET_KEY;

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!isValidEmail(email) || !password) {
    res.status(422).json({ message: "missing email and or password" });
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
    const decoded = jwt.verify(token, secretKey);
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      name: user.firstName,
    };

    res.json({ message: "Login successful", user: req.user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

const logout = (req, res) => {
  res.clearCookie("jwtToken");
  res.json({ message: "user logged out successfuly" });
};

const userDetails = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const usersCollection = db.collection("users");
    const userId = new ObjectId(req.user.userId);
    const currentUser = await usersCollection.findOne({ _id: userId });
    if (currentUser) {
      req.user = { ...req.user, ...currentUser };
      console.log('user details delivered to client...')
      res.json({ user: req.user });
    } else {
      res.status(404).json({ message: "User not found" });
      return;
    }
  } catch (error) {
    console.error("Error fetching current user", error);
    res.status(500).json({ message: "Error fetching user data" });
    return;
  }
};
module.exports = {
  userLogin,
  logout,
  userDetails,
};
