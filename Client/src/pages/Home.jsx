import { useEffect, useState} from "react";
import axios from "axios";
const Home = () => {

  const [userData, setUserData]= useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/private", {
          withCredentials: true, // Crucial for sending cookies
        });
        console.log("Response data:", res.data); 
        setUserData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle errors (e.g., redirect to login if unauthorized)
      }
    };
    fetchUser();
  }, []);
  if (!userData) {
    return <div>Loading...</div>;
  }
  return <div>Home</div>;
};

export default Home;
