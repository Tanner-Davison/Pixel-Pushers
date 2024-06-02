import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import text from "styles/text";
const Home = () => {
  const [userData, setUserData] = useState("");

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
