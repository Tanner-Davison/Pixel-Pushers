import axios from "axios";

export const fetchUserData = async (
  setUserData,
  setIsLoading,
  handleContextLogout
) => {
  try {
    const response = await axios.get("/pixel-pushers/user/data", {
      withCredentials: true,
    });
    setUserData(response.data.user);
    return setIsLoading(false);
  } catch (error) {
    console.error("Error fetching user data:", error);
    setIsLoading(false);
    handleContextLogout();
  }
};
export const updateUserData = async (data) => {
  try {
    const response = await axios.post("/pixel-pushers/user/update", {
      withCredentials: true,
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error while updating user data", error);
  }
};

export const fetchUserLocation = async () => {
  try {
    const response = await axios.get("https://ipinfo.io?token=6b922a43d53dac");
    const city = response.data.city;
    const region = response.data.region;
    return { city, region };
  } catch (error) {
    console.error("Error fetching user location:", error);
    return null;
  }
};
