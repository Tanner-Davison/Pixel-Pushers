
const express = require('express');
const {fetchAlbumCover, fetchArtistInfo} = require('../Controllers/musicController')

const musicRouter = express.Router();

musicRouter.get('/album', fetchAlbumCover)
musicRouter.get('/artist', fetchArtistInfo)

module.exports=musicRouter;