const {ObjectId } = require("mongodb"); 

const userDetails = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const usersCollection = db.collection("users");
    console.log(typeof req.user.userId);
    const userId = new ObjectId(req.user.userId);
    const currentUser = await usersCollection.findOne({ _id: userId });
    if (currentUser) {
      console.log("user found");
      req.user = { ...req.user, ...currentUser };
      next();
    } else {
      res.status(404).json({ message: "User not found" });
      return;
    }
  } catch (error) {
    console.error("Error fetching current user", error);
    res.status(500).json({ message: "Error fetching user data" }); // Send a 500 error
    return; // Prevent further execution
  }
};

module.exports = { userDetails };
