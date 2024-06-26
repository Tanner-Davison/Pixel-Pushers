import { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileBanner from "./ProfileBanner";
import text from "styles/text";
import media from "styles/media";
import { fetchUserData } from "../../API/UserData";
import { useAuth } from "../../AuthContext";
import ProfileIntro from "./ProfileIntro";
import { updateUserData } from "../../API/UserData";

const Profile = () => {
  const { handleContextLogout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    fetchUserData(setUserData, setIsLoading, handleContextLogout);
    //eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      {!isLoading && (
        <>
          <ProfileBanner userData={userData} />
          <ProfileIntro userData={userData} />
        </>
      )}
    </Wrapper>
  );
};

export default Profile;
const Friends = styled.div`
  

`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100vw;

  ${media.fullWidth} {
    width: 1440px;
  }

  ${media.tablet} {
    width: 100vw;
  }

  ${media.mobile} {
    width: 100vw;
  }
`;
