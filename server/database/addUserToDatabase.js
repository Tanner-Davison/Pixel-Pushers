const { MongoClient } = require('mongodb'); 
const bcrypt = require('bcrypt'); // Import bcrypt

const addUserToDatabase = async (req, res, next) => {
  try {
    const db = req.app.locals.db;
    const { firstName, lastName, email, password } = req.body;

    const usersCollection = db.collection('users');
    // check for existing users in db
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists' }); // 409 Conflict
      } 
    // Hash the password
    const saltRounds = 10; // Adjust as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user with the hashed password
    await usersCollection.insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword, 
    });

    next(); 
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

module.exports = {
  addUserToDatabase,
};