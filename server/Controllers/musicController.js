const axios = require("axios");
const fetchArtistInfo = async (searchQuery) => {
  console.log("HEERE", searchQuery);
  // Validate input
  if (!searchQuery) {
    return console.log("Artist Name is Required or not found");
  }

  try {
    const response = await axios.get("https://ws.audioscrobbler.com/2.0/", {
      params: {
        method: "artist.getInfo",
        artist: searchQuery,
        lang: "en",
        api_key: process.env.LAST_FM_API_KEY, // Ensure you have your API key in the environment variables
        format: "json",
        limit: 1,
      },
    });

    if (response.data) {
      return response.data.artist.bio.summary;
    } else {
      console.log("Nothing Found");
    }
  } catch (error) {
    console.log("Error fetching album data:", error);
  }
};

const fetchAlbumCover = async (req, res, next) => {
  const { searchQuery } = req.query;
  let summary = "";
  // Validate input
  if (!searchQuery) {
    return res.status(400).json({ error: "Album name is required" });
  }

  try {
    const response = await axios.get("https://ws.audioscrobbler.com/2.0/", {
      params: {
        method: "album.search",
        album: searchQuery,
        api_key: process.env.LAST_FM_API_KEY, // Ensure you have your API key in the environment variables
        format: "json",
        limit: req.query.limit || 1,
      },
    });

    if (response.data) {
      const artistInfo = await fetchArtistInfo(
        response.data.results.albummatches.album[0].artist
      );
      if (artistInfo) {
        summary = artistInfo;
      }
      res.json({
        info: response.data,
        summary: summary,
        img: response.data.results.albummatches?.album[0].image[3]["#text"],
      });
    } else {
      console.log("Nothing Found");
    }
  } catch (error) {
    console.log("Error fetching album data:", error);
    res.status(500).json({ error: "Failed to fetch album data" });
  }
};

module.exports = { fetchAlbumCover, fetchArtistInfo };
