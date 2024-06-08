import axios from 'axios';

export const fetchUserData = async(setUserData, setIsLoading, handleContextLogout)=>{
    try {
        const response = await axios.get("/pixel-pushers/userData", {
          withCredentials: true,
        });
        setUserData(response.data.user);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false)
        handleContextLogout()
      }
}