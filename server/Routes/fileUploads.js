const express = require('express');
const upload = require('../middleware/multer');
const { uploadProfilePhoto, uploadCoverPhoto } = require('../Controllers/cloudinaryController');
const { authenticate } = require('../middleware/auth');

const uploadRouter = express.Router();

// File upload routes
uploadRouter.post('/coverPhoto', authenticate, upload.single('file'), uploadCoverPhoto);
uploadRouter.post('/profilePhoto', authenticate, upload.single('file'), uploadProfilePhoto);

module.exports = uploadRouter;