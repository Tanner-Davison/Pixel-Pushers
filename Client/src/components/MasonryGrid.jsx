import React, { useState } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import hayden from "../assets/hayden.png";
import eyes from "../assets/prettyEyes.png";
import getMedia from "../utils/getMedia";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const MasonryGrid = () => {
  useGSAP(
    () => {
      const target = document.querySelector(".angry-face");
      const bg = document.querySelector(".angry-div");

      const tl = gsap
        .timeline({ paused: true })
        .to(target, {
          rotate: 180,
          ease: "linear",
        })
        .to(bg, { backgroundColor: "#132E32" }, "<");

      target.addEventListener("mouseenter", () => tl.play());
      target.addEventListener("mouseleave", () => tl.reverse());
    },
    { scope: ".masonry-grid" }
  );

  return (
    <Wrapper className={"masonry-grid"}>
      <Boxes
        $radius={"20px"}
        $backgroundcolor={"black"}
        $flex={getMedia(25, 15, 15, 1)}
        $width={getMedia("350px", "24.306vw", "20.063vw", "23.364vw")}
        $height={getMedia("220px", "250px", "27.778vw", "200px")}
        $align
        $justify={"center"}
      >
        <Image
          src={hayden}
          alt={"RAINBOW SPARKLE"}
          $height={"100%"}
          $width={"100%"}
          $cover={true}
        />
      </Boxes>
      <Boxes
        $radius={"20px"}
        $backgroundcolor={"transparent"}
        $flex={2}
        $gap={"10px"}
        $direction={"column"}
        $width={getMedia("300px", "300px", "300px", "300px")}
      >
        <SmallBox $radius={"8px"} $backgroundcolor={"#FF6663"}>
          Hello world
        </SmallBox>
        <SmallBox $radius={"8px"} $backgroundcolor={"#99C24D  "}>
          Hello world
        </SmallBox>
        <SmallBox $radius={"8px"} $backgroundcolor={"#8963BA"}>
          Hello world
        </SmallBox>
      </Boxes>
      <Boxes
        $radius={"15px"}
        $backgroundcolor={"#A4A8D1"}
        $width={getMedia("200px", "13.889vw", "19.531vw", "46.729vw")}
      >
        world
      </Boxes>
      <Boxes
        $radius={"15px"}
        $flex={1}
        $height={"100px"}
        $width={getMedia("300px", "20.833vw", "29.297vw", "45.093vw")}
        $backgroundcolor={"#177E89"}
      >
        <Small>world how are you today </Small>
      </Boxes>

      <Boxes
        className={"angry-div"}
        $radius={"300px"}
        $width={getMedia("100px", "6.944vw", "7.324vw", "32.083vw")}
        $backgroundcolor={"#E71D36"}
        $height={"100px"}
        $justify={"center"}
      >
        <Image
          className={"angry-face"}
          src={eyes}
          $width={getMedia("50px", "120px", "50px", "50px")}
          $rotate={`rotate(25deg)`}
          alt={"eyespeeking"}
          $align={"center"}
        />
      </Boxes>

      <Boxes $radius={"15px"} $flex={1} $backgroundcolor={`#FF6663`}>
        world
      </Boxes>
    </Wrapper>
  );
};

export default MasonryGrid;
const Small = styled.p`
  ${text.bodyXSBold}
`;
const Image = styled.img`
  position: relative;
  height: ${(props) => props.$height || "13.194vw"};
  width: ${(props) => props.$width || "13.194vw"};
  align-self: ${(props) => props?.$align || "unset"};
  border-radius: 25px;
  top: ${(props) => props.$top || "unset"};
  left: ${(props) => props.$left || "unset"};
  object-fit: ${(props) => (props.$cover ? "cover" : "fill")};

  ${media.fullWidth} {
    width: ${(props) => props.$width || "190px"};
    height: ${(props) => props.$height || "190px"};
  }

  ${media.tablet} {
    width: ${(props) => props.$width || "21.531vw"};
    height: ${(props) => props.$height || "21.531vw"};
  }

  ${media.mobile} {
    height: ${(props) => props.$height || "width: 40.729vw"};
    height: 40.729vw;
  }
`;
const SmallBox = styled.div`
  position: relative;
  background-color: ${(props) => props.$backgroundcolor || "white"};
  align-items: ${(props) => props.$align || "center"};
  border-radius: ${(props) => props.$radius || "0px"};
  width: 100%;
  height: ${(props) => props.$height || "auto"};
  padding: 1.389vw;
  &:hover {
    transform: scale(1.1);
  }
  transition: transform 0.3s ease-in;

  ${media.fullWidth} {
    border-radius: ${(props) => props.$radius || "0vw"};
    padding: 20px;
  }

  ${media.tablet} {
    border-radius: ${(props) => props.$radius || "0vw"};
    padding: 1.953vw;
  }

  ${media.mobile} {
    border-radius: ${(props) => props.$radius || "0vw"};
    padding: 12px;
  }
`;
const Boxes = styled.div`
  position: relative;
  ${(props) => props.$fontsize || `${text.bodyM}`};
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  align-items: ${(props) => props.$align || "center"};
  justify-content: ${(props) => props.$justify || "flex-start"};
  text-align: center;
  background-color: ${(props) => props.$backgroundcolor || "white"};
  height: ${(props) => props.$height || "auto"};
  flex: ${(props) => props.$flex || "unset"};
  padding: 0.694vw;
  border-radius: ${(props) => props.$radius || "0vw"};
  min-width: ${(props) => props.$width || "6.944vw"};
  gap: ${(props) => props.$gap || "0.694vw"};
  overflow: hidden;
  &:hover {
    transform: scale(1.1);
  }
  transition: transform 0.3s ease-in-out;
  ${media.fullWidth} {
    padding: 10px;
    border-radius: ${(props) => props.$radius || "0px"};
    min-width: ${(props) => props.$width || "200px"};
    gap: ${(props) => props.$gap || "10px"};
  }

  ${media.tablet} {
    padding: 0.977vw;
    border-radius: ${(props) => props.$radius || "0vw"};
    min-width: ${(props) => props.$width || "19.531vw"};
    gap: ${(props) => props.$gap || "0.977vw"};
  }

  ${media.mobile} {
    padding: 2.336vw;
    border-radius: ${(props) => props.$radius || "0vw"};
    min-width: ${(props) => props.$width || "100px"};
    gap: ${(props) => props.$gap || "2.336vw"};
  }
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-self: center;
  flex-wrap: wrap;
  width: 65%;
  background-color: #000000;
  padding: 0.694vw;
  border-radius: 1.389vw;
  gap: 0.556vw;
  ${media.fullWidth} {
    gap: 8px;
    padding: 10px;
    border-radius: 20px;
    width: 65%;
  }

  ${media.tablet} {
    gap: 0.781vw;
    width: 75%;
    padding: 0.977vw;
    border-radius: 1.953vw;
  }

  ${media.mobile} {
    width: 100%;
    gap: 1.869vw;
    padding: 2.336vw;
    border-radius: 4.673vw;
  }
`;
