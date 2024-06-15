import React, { useEffect } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import gsap from "gsap";
import { GSDevTools } from "gsap/GSDevTools";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(GSDevTools);
const BlockAnimation = ({ length }) => {
  useGSAP(
    () => {
      const blocks = gsap.utils.toArray(".blocky");
      const blockTl = gsap
        .timeline({ repeat: -1, yoyo: true })
        .to(blocks, {
          keyframes: {
            "25%": { y: 0, rotate: 0, autoAlpha: 1 },
            "50%": { y: -100 },
            "75%": { y: 0, rotate: 380, ease: "bounce", autoAlpha: 1 },
            "100%": { x: length, y: 0, rotate: 360, autoAlpha: 0 },
          },
          duration: 3,
          stagger: 0.5,
        })
        .to(
          ".blocky-two",
          {
            keyframes: {
              0: { rotate: 1280, y: 0 },
              "45%": { y: 0 },
              "50%": { y: -65},
              "60%": { y: 0 },
              "90%":{scale:1, borderColor:'white'},
              "100%": { x: `-${length}`, y: 0, rotate: 10,scale:1.5, borderColor:'red' },
            },
            duration: 4,
          },
          0
        );
      //eslint-disable-next-line
    },
    { scope: ".blocky-scope" }
  );

  return (
    <Wrapper className="blocky-scope">
      <Block className="blocky" />
      <Block className="blocky" />
      <Block className="blocky" />
      <BlockTwo className="blocky-two" />
      <Ground />
    </Wrapper>
  );
};

export default BlockAnimation;
const Ground = styled.div`
  position: absolute;
  width: 100%;
  top: 8.958vw;
  height: 0.208vw;
  background-color: ${colors.navGreen};
  ${media.fullWidth} {
    top: 129px;
    height: 3px;
  }
  
  ${media.tablet} {
    top: 12.598vw;
    height: 0.293vw;
  }
  
  ${media.mobile} {

    top: 30.03vw;
  }
`;
const Block = styled.div`
  position: absolute;
  width: 1.736vw;
  height: 1.736vw;

  opacity: 0;
  border-radius: 0.208vw;
  border: 0.347vw solid ${colors.primaryPurple};
  top: 6.944vw;
  ${media.fullWidth} {
    width: 25px;
    height: 25px;
    border-radius: 3px;
    border: 5px solid ${colors.white};
    top: 100px;
  }

  ${media.tablet} {
    width: 2.441vw;
    height: 2.441vw;
    border-radius: 0.293vw;
    border: 0.488vw solid ${colors.white};
    top: 9.766vw;
  }

  ${media.mobile} {
    width: 5.841vw;
    height: 5.841vw;
    border-radius: 0.701vw;
    border: 1.168vw solid ${colors.white};
    top: 23.364vw;
  }
`;
const BlockTwo = styled.div`
  position: absolute;
  width: 1.736vw;
  height: 1.736vw;
  border-radius: 0.208vw;
  border: 0.347vw solid ${colors.white};
  top: 7.0vw;
  right: 0vw;
  
  ${media.fullWidth} {
    width: 25px;
    height: 25px;
    border-radius: 3px;
    border: 5px solid ${colors.white};
    top: 100px;
    right: 0px;
  }

  ${media.tablet} {
    width: 25px;
    height: 25px;
    border-radius: 3px;
    border: 5px solid ${colors.white};
    top: 9.766vw;
    right: 0vw;
  }

  ${media.mobile} {
    width: 5.841vw;
    height: 5.841vw;
    border-radius: 0.701vw;
    border: 1.168vw solid ${colors.white};
    top: 23.364vw;
    right: 0vw;
  }
`;
const Wrapper = styled.div`
  position: relative;
  height: 300px;
`;
