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
      console.log(response.data);
      return {
        summary: response.data.artist.bio.summary,
        mbid: response.data.artist.mbid,
      };
    } else {
      console.log("Nothing Found");
    }
  } catch (error) {
    console.log("Error fetching album data:", error);
  }
};
const fetchAllAlbumInfo = async (artistName, albumName) => {
  try {
    const allInfo = await axios.get("https://ws.audioscrobbler.com/2.0/", {
      params: {
        method: "album.getInfo",
        artist: artistName,
        album: albumName,
        api_key: process.env.LAST_FM_API_KEY, // Ensure you have your API key in the environment variables
        format: "json",
        limit: 1,
      },
    });
    if (allInfo) {
      console.log(allInfo);

      return allInfo;
    }
  } catch (error) {
    console.log("Error fetching ALL album Info:", error);
    return;
  }
};

const fetchAlbumCover = async (req, res, next) => {
  const { searchQuery } = req.query;
  let summary = "";
  let albumName = "";
  let artistName = "";
  let allInfo;
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
      artistName = response.data.results.albummatches.album[0].artist;
      albumName = response.data.results.albummatches.album[0].name;
      const artistInfo = await fetchArtistInfo(artistName);
      if (albumName != "" && artistName != "") {
        summary = artistInfo.summary;
      }
      res.json({
        info: response.data,
        allAlbumInfo: allInfo,
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
