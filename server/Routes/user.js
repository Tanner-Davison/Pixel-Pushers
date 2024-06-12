const express = require('express');
const userRouter = express.Router();

const { authenticate, verifyNewUserData } = require('../middleware/auth');
const { userLogin, logout, userDetails, } = require('../Controllers/UserController');
const{addUserToDatabase}=require('../database/addUserToDatabase')
const {updateUserInfo} = require('../database/updateUser')


//adding temp comment
// User-related routes
userRouter.post('/signup', verifyNewUserData, addUserToDatabase);
userRouter.post('/login', userLogin);
userRouter.post('/logout', authenticate, logout);
userRouter.post('/update', authenticate, updateUserInfo);
userRouter.get('/data', authenticate, userDetails);

module.exports = userRouter;