import React, { useEffect } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import gsap from "gsap";

const DefaultMusicBoxWrapper = () => {
  useEffect(() => {
    const headlines = gsap.utils.toArray(".headlines-music-box");
    const subheaders = gsap.utils.toArray(".sub-headers-music");
    const recordPlayer = document.querySelector(".default-record");
    const tl = gsap.timeline({ paused: false });
    tl.set(subheaders,{autoAlpha:0,xPercent:-150, x:'-170px'})
    tl.fromTo(
      recordPlayer,
      { autoAlpha: 0, xPercent: "-100" },
      { autoAlpha: 1, xPercent: "0", ease:'back',duration:2 }
    );
    tl.fromTo(
      headlines,
      { autoAlpha: 0, xPercent: "100" },
      { autoAlpha: 1,stagger:.4, xPercent: "0",ease:'back', duration:1.4 }
      ,0)
      .to(headlines[1],{xPercent:"200",duration:1},'<+=2')
      .to(subheaders[0],{autoAlpha:1, xPercent:75,duration:1})
      .to(subheaders[0],{xPercent:250,autoAlpha:0,duration:1.3},'<+=2')
      .to(subheaders[1],{autoAlpha:1, xPercent:0, duration:1.5})
      .to(recordPlayer,{x:'100px', duration:1},'<')
      .to(recordPlayer,{x:'-45px',duration:1},'>-=.3')
  }, []);

  return (
    <Wrapper>
      <Headline className={"headlines-music-box"}>Discover </Headline>
      <SubHeadline className={"headlines-music-box"}>Music.</SubHeadline>
      <SubHeadline className={"sub-headers-music"}>Joy</SubHeadline>
      <SubHeadline className={"sub-headers-music"}>You.</SubHeadline>
    </Wrapper>
  );
};

export default DefaultMusicBoxWrapper;
const SubHeadline = styled.h2`
  position: relative;
  ${text.h2};
  color: ${colors.white};
  top: 2.431vw;
  left:6.944vw;
  ${media.fullWidth} {
    top: 35px;
    left:100px;
  }

  ${media.tablet} {
    top: 35px;
    left:9.766vw;
  }

  ${media.mobile} {
    ${text.h2Mobile}
    top:35px;
    left:23.364vw;
  }
`;
const Headline = styled.h2`
  position: relative;
  ${text.h2};
  color: ${colors.primaryOrange};
  left: 180px;
  ${media.fullWidth} {
    left: 180px;
  }

  ${media.tablet} {
    left: 17.578vw;
  }

  ${media.mobile} {
    left: 42.056vw;
  }
`;
const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex: 1;
`;
