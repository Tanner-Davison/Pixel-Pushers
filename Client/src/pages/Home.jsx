import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import text from "styles/text";

import { useAuth } from "../AuthContext";

const Home = () => {
  const [userData, setUserData] = useState("");
 const {handleContextLogout} = useAuth()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/home", {
          withCredentials: true,
        });
        setUserData(res.data);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        handleContextLogout()
      }
    };

    fetchUser();

  }, [handleContextLogout]);
  const username = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const welcome = !userData ? (
    <WelcomeMessage>{"Welcome Please Continue to login"}</WelcomeMessage>
  ) : (
    <WelcomeMessage>{`Welcome ${username(
      userData.firstName
    )},`}</WelcomeMessage>
  );

  return <div>{welcome}</div>;
};

export default Home;

const WelcomeMessage = styled.p`
  ${text.bodyMChillax}
  padding:10px;
`;
