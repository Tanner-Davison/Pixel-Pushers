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
        const res = await axios.get("/api/private", {
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
    const firstLetter = name.slice(0, 1).toUpperCase();
    const restOfName = name.slice(1).toLowerCase();
    return firstLetter + restOfName;
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
