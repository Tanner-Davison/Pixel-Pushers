
const bcrypt = require("bcrypt");

const addUserToDatabase = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const { firstName, lastName, email, password } = req.body;

    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await usersCollection.insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "Login Success" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

module.exports = {
  addUserToDatabase,
};
