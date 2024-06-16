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
        .timeline({ repeat: -1, yoyo: false, repeatDelay: 1 })
        .to(blocks, {
          keyframes: {
            "25%": { y: 3, rotate: 0, autoAlpha: 1 },
            "50%": { y: -100 },
            "75%": { y: 3, rotate: 370, ease: "bounce" },
            "94%": { x: length, y: 3, rotate: 360, autoAlpha: 1 },
            100: { y: 100, autoAlpha: 0 },
          },
          duration: 3,
          stagger: 0.5,
        })
        .to(
          ".blocky-two",
          {
            keyframes: {
              0: { y: 50, ease: "power1.out", rotate: 1500 },
              10: { y: 0, x: 10, ease: "back.out" },
              20: { rotate: 1280, y: 0, ease: "power1.out" },
              50: { borderRadius: "8px" },
              85: { y: 0 },
              "89%": {
                x: `-${length}`,
                y: 0,
                rotate: 10,
              },
              98: { autoAlpha: 1 },
              100: { x: `-${length}`, y: 150, autoAlpha: 0 },
            },
            duration: 4,
          },
          0
        )
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
  height: 0.408vw;
  border-radius: 50px;
  perspective:100;
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
  border: 0.347vw solid ${colors.primaryYellow};
  top: 7vw;
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
