const express = require('express');
const { authenticate, verifyNewUserData } = require('../middleware/auth');
const { 
  addUserToDatabase, 
  userLogin, 
  logout, 
  userDetails, 
  updateUserInfo 
} = require('../Controllers/UserController');

const userRouter = express.Router();

// User-related routes
userRouter.post('/signup', verifyNewUserData, addUserToDatabase);
userRouter.post('/login', userLogin);
userRouter.post('/logout', authenticate, logout);
userRouter.post('/update', authenticate, updateUserInfo);
userRouter.get('/data', authenticate, userDetails);

module.exports = userRouter;