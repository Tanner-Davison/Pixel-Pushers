import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import pickleRick from "../assets/pickleRick.png";
import gsap from "gsap";
import { GSDevTools } from "gsap/all";
import { useGSAP } from "@gsap/react";
import portalbg from "../assets/portal.png";
import { EasePack } from "gsap/all";
gsap.registerPlugin(EasePack);

const PortalPusher = () => {
    const [time, setTime]= useState(null)
  const scopeRef = useRef();
  useGSAP(
    () => {
      const pickle = document.querySelector(".pickle-rick");
      const portalOne = document.querySelector(".portal-one");
      const portalTwo = document.querySelector(".portal-two");
      gsap.set(pickle, { rotate: 80, });

      const portalTl = gsap
        .timeline({ repeat: -1, repeatDelay: 5 })
        .from(portalOne, {
          scale: 0,
          autoAlpha: 0,
          repeat: 1,
          repeatDelay: 0.5,
          yoyo: true,
        })
        .from(
          pickle,
          {
            scaleY:1.2,
            scaleX:.8,
            left: -210,
            scale: 1,
            top: 50,
            rotate: -300,
            duration: 1.9,
            ease: "slow(0.2, 0.7)",
          },
          0.27
        )
        .from(
          portalTwo,
          { scale: 0, autoAlpha: 0, repeat: 1, yoyo: true, repeatDelay: 0.5 },
          0.67
        );
//total time: 2.17
    },
    { scope: scopeRef }
  );

  return (
    <Wrapper className={"portal-pushers-wrapper"} ref={scopeRef}>
      <Portal className={"portal-one"} />
      <PortalTwo className={"portal-two"} />
      <PickleWrapper>
        <Pickle
          src={pickleRick}
          alt={"pickle-rick"}
          className={"pickle-rick"}
        />
      </PickleWrapper>
    </Wrapper>
  );
};

export default PortalPusher;

const Portal = styled.div`
  position: absolute;
  overflow: hidden;
  background: green;
  background-image: url(${portalbg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 150%;

  left: 0px;
  top: 0px;
  width: 120px;

  border-radius: 50%;
  height: 300px;

  box-sizing: border-box;
`;
const PortalTwo = styled.div`
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
  background: green;
  background-image: url(${portalbg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 125% 150%;
  top: 100px;
  height: 200px;
  width: 40px;
  border-radius: 50%;

  right: 0px;
`;
const Pickle = styled.img`
  position: absolute;
  height: 200px;
  top: 100px;
  scale: 0.5;
  left: 102%;
  perspective: 50;
`;
const PickleWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  perspective: 10px;
  left: 20px;
  width: 97%;
  height: 20.833vw;
`;
const Wrapper = styled.div`
  position: absolute;
  overflow: hidden;
  left: 0px;
  width: 100%;
  height: 500px;

  box-sizing: border-box;
`;
