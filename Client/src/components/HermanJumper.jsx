import React, { useState } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GSDevTools } from "gsap/all";
import pickleRick from "../assets/pickleRick.png";
import portalRick from '../assets/portal.png';

const HermanJumper = () => {
  useGSAP(
    () => {
      const hole = document.querySelector(".hole");
      const herman = document.querySelector(".herman");
      const tl = gsap
        .timeline({ repeat: -1, yoyo: true, repeatDelay: 2, delay: 2 })
        .from(hole, { scale: 0, repeat: 1, yoyo: true })
        .fromTo(
          herman,
          { y: 175, x: 0, scaleY: 2 , rotate:-20},
          { y: -175, scaleY: 1, rotate:20 },
          0.2
        )
        .to(herman, { y: 0, ease: "power1.in",rotate:360 }, ">")
        .to(herman, {
          scaleY: 0.8,
          scaleX: 1.1,
          transformOrigin: "50% 100%",
          duration:0.2,
          repeat: 1,
          yoyo: true,
        });

  
    },
    { scope: ".herman-wrapper" }
  );

  return (
    <Wrapper className="herman-wraper">
      <Hole className="hole" />
      <HermanWrapper>
        <Herman className={"herman"} src={pickleRick} alt="herman-picture" />
      </HermanWrapper>
    </Wrapper>
  );
};

export default HermanJumper;
const Herman = styled.img`
  box-sizing: border-box;
  position: absolute;
  width: 7.917vw;
  bottom: 0vw;
  left: 10.417vw;
  ${media.fullWidth} {
    width: 114px;
    bottom: 0px;
    left: 150px;
  }

  ${media.tablet} {
    width: 11.133vw;
    bottom: 0vw;
    left: 14.648vw;
  }

  ${media.mobile} {
    width: 23.364vw;
    bottom: 0vw;
    left: 35.047vw;
  }
`;
const HermanWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 20.833vw;
  border-radius: 50%;
  overflow: hidden;
  ${media.fullWidth} {
    height: 300px;
  }

  ${media.tablet} {
    height: 33.297vw;
  }

  ${media.mobile} {
    height: 70.093vw;
  }
`;
const Hole = styled.div`
  box-sizing: border-box;
  position: absolute;
  background:green;
  background-image:url(${portalRick});
  background-repeat: no-repeat;
  background-position: center;
  background-size:125% 150%;
  border-radius: 50%;
  width: 10.417vw;
  height: 1.389vw;
  left: 8.681vw;
  top: 20.139vw;
  ${media.fullWidth} {
    width: 150px;
    height: 20px;
    left: 125px;
    top: 290px;
  }

  ${media.tablet} {
    width: 14.648vw;
    height: 1.953vw;
    left: 12.207vw;
    top: 32.32vw;
  }

  ${media.mobile} {
    width: 35.047vw;
    height: 4.673vw;
    border-radius: 50%;
    background: black;
    left: 29.206vw;
    top: 67.757vw;
  }
`;
const Wrapper = styled.div`
  position: absolute;
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  background: transparent;
  align-self:center;
  left: 0vw;
  width: 27.778vw;
  height: 27.778vw;
  top: 320px;

  ${media.fullWidth} {
    left: -400px;
    width: 400px;
    height: 400px;
  }

  ${media.tablet} {
    left: 0.063vw;
    width: 39.063vw;
    height: 39.063vw;
  }

  ${media.mobile} {
    width: 93.458vw;
    height: 93.458vw;
    left: -30px;
    top: 400px;
  }
`;
