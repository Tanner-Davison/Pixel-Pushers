import axios, { AxiosError } from "axios";
import noResults from "../assets/noResults.webp";
export const fetchArtistData = async (artistData) => {
  console.log(artistData);
  try {
    const response = await axios.get("/pixel-pushers/music/album", {
      params: { artistData },
    });
    console.log(response.data);
    if (response.data) {
      console.log(response.data.info);
      if (response.data.img === "") {
        return { info: false, img: noResults };
      }
      return { info: response.data, img: response.data.img };
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 500) {
        console.log(error.response);
        return { info: false, img: noResults };
      } else {
        console.log(error.response);
      }
    }
  }
};
