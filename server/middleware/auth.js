const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

const authenticate = async (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = { userId: decoded.userId, email: decoded.email };
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

//helper function
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
//

const verifyNewUserData = (req, res, next) => {
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

module.exports = { authenticate, verifyNewUserData };
