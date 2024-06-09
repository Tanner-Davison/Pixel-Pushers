import { useEffect, useState } from "react";
import styled from "styled-components";
import text from "styles/text";
import { username } from "../HelperFunctions/username";
import { useAuth } from "../AuthContext";
import { fetchUserData } from "../API/UserData";

const Home = () => {
  const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { handleContextLogout } = useAuth();

  useEffect(() => {
    fetchUserData(setUserData, setIsLoading, handleContextLogout);
  }, [handleContextLogout]);

  
  return (
  <Wrapper>
    {isLoading && <Loading></Loading>}
    {!isLoading && !userData && <WelcomeMessage>{'Please continue to'}<a href={'/login'}> login</a></WelcomeMessage>}
    {userData && <WelcomeMessage>{`Welcome ${username(userData.firstName)},`}</WelcomeMessage>}
  </Wrapper>
  
)};

export default Home;
const Loading = styled.p`
  ${text.bodyM}

`
const WelcomeMessage = styled.p`
  ${text.bodyMChillax}
  padding:10px;
`;
const Wrapper = styled.div`
  display: flex;

`
