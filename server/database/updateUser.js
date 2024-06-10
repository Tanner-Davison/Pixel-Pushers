const { ObjectId } = require("mongodb");

const updateUserInfo = async (req, res) => {
  const { headline, selected, location } = req.body.data;
  const db = req.app.locals.db;
  const userCollection = db.collection("users");
  const userId = new ObjectId(req.user.userId);

  try {
    const updateUser = await userCollection.findOne({ _id: userId });

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateData = {}; 
    if (headline !== undefined) updateData.headline = headline; 
    if (selected !== undefined) updateData.selected = selected;
    if (location !== undefined) updateData.location = location;

    const updateResult = await userCollection.findOneAndUpdate(
      { _id: userId },
      { $set: updateData },
      { upsert: true }
    );

    if (updateResult.value) {
      console.log('user updated success');
      return res.status(200).json({ message: "User information updated successfully" });
    } else {
      return res.status(200).json({message:'Not all fields updated'})
    }
  } catch (error) {
    console.error("Error updating user info", error);
    console.log(error); 
    res.status(500).json({ message: "Error updating user information" });
  }
};

module.exports = {
  updateUserInfo,
};