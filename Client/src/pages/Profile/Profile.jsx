import { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileBanner from "./ProfileBanner";
import text from "styles/text";
import media from "styles/media";
import { fetchUserData } from "../../API/UserData";
import { username } from "../../HelperFunctions/username";
import { useAuth } from "../../AuthContext";

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
          <UserInfo>
            {userData?.firstName && userData?.lastName && (
              <Username>{`${username(userData.firstName)}${username(
                userData.lastName
              )}`}</Username>
            )}
          </UserInfo>
        </>
      )}
    </Wrapper>
  );
};

export default Profile;
const Username = styled.h4`
  ${text.h4}
`;
const UserInfo = styled.div`
  display: flex;
  align-self: flex-start;
  margin: 100px 0px 0px 100px;
  ${media.fullWidth} {
  }

  ${media.tablet} {
    margin: 9.766vw 0vw 0vw 9.766vw;
  }

  ${media.mobile} {
    margin: 18.692vw 0vw 0vw 11.682vw;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 79.167vw;

  ${media.fullWidth} {
    width: 1140px;
  }

  ${media.tablet} {
    width: 85.703vw;
  }

  ${media.mobile} {
    width: 100vw;
  }
`;
