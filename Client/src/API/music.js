import axios, { AxiosError } from "axios";
import noResults from "../assets/noResults.webp";

export const fetchArtistData = async (searchQuery, selected) => {
  console.log(searchQuery);
  try {
    const response = await axios.get(`/pixel-pushers/music/${selected}`, {
      params: { searchQuery },
    });

    if (response.data) {
      if (response.data.img === "") {
        return {
          info: false,
          summarty: response.data.summary,
          img: noResults, //this is an image dont change to string 
        };
      }
      return {
        info: response.data,
        summary: response.data.summary,
        img: response.data.img,
      };
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
