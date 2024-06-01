import { useEffect, useState} from "react";
import axios from "axios";
const Home = () => {

  const [userData, setUserData]= useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/private", {
          withCredentials: true, 
        });
        console.log("Response data:", res.data); 
        setUserData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
       
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
