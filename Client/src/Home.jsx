import { useEffect, useState } from "react";
import styled from "styled-components";
import text from "styles/text";
import { username } from "./HelperFunctions/username";
import { useAuth } from "./AuthContext";
import { fetchUserData } from "./API/UserData";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import colors from "styles/colors";
import media from "styles/media";
import getMedia from './utils/getMedia';
import { GSDevTools } from "gsap/all";
import BlockAnimation from "./components/nav/BlockAnimation";
gsap.registerPlugin(SplitText);

const Home = () => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { handleContextLogout } = useAuth();

  useEffect(() => {
    if (!userData) {
      fetchUserData(setUserData, setIsLoading, handleContextLogout);
      const split = new SplitText("#splitText", { type: "lines" });
      const animation = gsap.timeline({
        defaults: { duration: 1, ease: "back(2)" },
      });

      animation.to(".wrapper", { autoAlpha: 1 });
      animation.from(
        split.lines,
        {
          y: 100,
          opacity: 0,
          rotationX: -90,
          rotationY: -45,
          stagger: 0.04,
          transformOrigin: "50% 50% 150",
        },
        0
      );
    }
    //eslint-disable-next-line
  }, [isLoading]);

  return (
    <Wrapper className="wrapper">
      {!isLoading && !userData && (
        <NotLoggedInWrapper>
        <WelcomeMessage id="splitText">
          {
            "Welcome to PIXEL PUSHERS to have access to all features please continue to"
          }
          <a href={"/login"}> login</a>
        </WelcomeMessage>
        <BlockAnimation length={getMedia('500px','500px','405px','310px')}/>
        </NotLoggedInWrapper>
      )}
      {userData && (
        <WelcomeMessage>{`Welcome ${username(
          userData.firstName
        )},`}</WelcomeMessage>
      )}
    </Wrapper>
  );
};

export default Home;
const WelcomeMessage = styled.div`
  ${text.h3Chillax}
  text-align: center;
  padding: 0.694vw;
  width: 34.722vw;
  perspective: 27.778vw;
  margin-top: 6.944vw;
  a {
    color: ${colors.navGreen};
  }
  ${media.fullWidth} {
    padding: 10px;
    width: 500px;
    perspective: 400px;
    margin-top: 100px;
  }

  ${media.tablet} {
    padding: 0.977vw;
    width: 48.828vw;
    perspective: 39.063vw;
    margin-top: 9.766vw;
  }

  ${media.mobile} {
    padding: 2.336vw;
  width: 79.907vw;
  perspective: 46.729vw;
  margin-top: 11.682vw;
  }
`;
const NotLoggedInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap:40px;

`
const Wrapper = styled.div`
  display: flex;
  visibility: hidden;
  align-items: center;
  justify-content: center;
`;
