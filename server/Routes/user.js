const express = require('express');
const { authenticate, verifyNewUserData } = require('../middleware/auth');
const { 
  userLogin, 
  logout, 
  userDetails, 
} = require('../Controllers/UserController');
const{addUserToDatabase}=require('../database/addUserToDatabase')
const {updateUserInfo}=require('../database/updateUser')

const userRouter = express.Router();

// User-related routes
userRouter.post('/signup', verifyNewUserData, addUserToDatabase);
userRouter.post('/login', userLogin);
userRouter.post('/logout', authenticate, logout);
userRouter.post('/update', authenticate, updateUserInfo);
userRouter.get('/data', authenticate, userDetails);

module.exports = userRouter;