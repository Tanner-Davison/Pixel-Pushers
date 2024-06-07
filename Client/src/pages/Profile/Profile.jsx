import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ProfileBanner from "./ProfileBanner";
import text from "styles/text";
import media from "styles/media";

const Profile = () => {
  const username = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() + " ";
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/userData", {
          withCredentials: true,
        });
        setData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Wrapper>
      <ProfileBanner data={data} />
      <UserInfo>
        {data?.firstName && data?.lastName && (
          <p>{`${username(data.firstName)}${username(data.lastName)}`}</p>
        )}
      </UserInfo>
    </Wrapper>
  );
};

export default Profile;
const UserInfo = styled.div`
  display: flex;
  ${text.h4}
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
