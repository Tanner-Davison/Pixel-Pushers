import React from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import hayden from "../assets/hayden.png";
import getMedia from "../utils/getMedia";

const MasonryGrid = () => {
  return (
    <Wrapper>
      <Boxes
        $radius={"20px"}
        $backgroundcolor={"black"}
        $flex={25}
        $width={getMedia('450px', '31.25vw', '43.945vw', '45.14vw')}
        $height={"200px"}
        $justify={'center'}
      >
      j
        <Image src={hayden} alt={"RAINBOW SPARKLE"} />
      </Boxes>
      <Boxes
        $radius={"20px"}
        $backgroundcolor={"transparent"}
        $flex={2}
        $gap={"20px"}
        $direction={"column"}
      >
        <SmallBox $radius={"8px"} $backgroundcolor={"gray"}>
          Hello world
        </SmallBox>
        <SmallBox $radius={"8px"} $backgroundcolor={"green"}>
          Hello world
        </SmallBox>
        <SmallBox $radius={"8px"} $backgroundcolor={"gray"}>
          Hello world
        </SmallBox>
      </Boxes>
      <Boxes $radius={"15px"} $backgroundcolor={"pink"} $flex={1}>
        world
      </Boxes>
      <Boxes
        $radius={"15px"}
        $flex={1}
        $height={"100px"}
        $width={getMedia('300px', '20.833vw', '29.297vw', '45.093vw')}
        $backgroundcolor={"hotpink"}
      >
        world how are you today
      </Boxes>
      <Boxes
        $radius={"15px"}
        $width={getMedia('300px', '20.833vw', '29.297vw', '45.093vw')}
        $backgroundcolor={"pink"}
        $flex={4}
      >
        world
      </Boxes>
      <Boxes $radius={"15px"} $flex={1} $backgroundcolor={`purple`}>
        world
      </Boxes>
    </Wrapper>
  );
};

export default MasonryGrid;

const Image = styled.img`
 height:13.194vw;
 width:13.194vw;
 border-radius: 25px;
  ${media.fullWidth} {
    width:190px;
    height: 190px;
  }
  
  ${media.tablet} {
    width:21.531vw;
    height: 21.531vw;
  }
  
  ${media.mobile} {
    width:40.729vw;
    height: 40.729vw;
  }
`
const SmallBox = styled.div`
  background-color: ${(props) => props.$backgroundcolor || "white"};
  width: 100%;
  border-radius: ${(props) => props.$radius || "0px"};
  padding: 12px;
  height: ${(props) => props.$height || "auto"};
  &:hover {
    transform: scale(1.1);
  }
  transition: transform 0.3s ease-in;

  ${media.fullWidth} {
    border-radius: ${(props) => props.$radius || "0vw"};
  padding: 0.833vw;
  }
  
  ${media.tablet} {
    border-radius: ${(props) => props.$radius || "0vw"};
  padding: 1.872vw;
  }
  
  ${media.mobile} {
    border-radius: ${(props) => props.$radius || "0vw"};
  padding: 2.804vw;
  }
`;
const Boxes = styled.div`
${text.bodyM}
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  align-items: center;
  justify-content: ${props=> props.$justify || 'flex-start'};
  text-align: center;
  background-color: ${(props) => props.$backgroundcolor || "white"};
  height: ${(props) => props.$height || "auto"};
  flex: ${(props) => props.$flex || "1"};
  padding: 0.694vw;
  border-radius: ${(props) => props.$radius || "0vw"};
  min-width: ${(props) => props.$width || "13.889vw"};
  gap: ${(props) => props.$gap || "0.694vw"};
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
    min-width: ${(props) => props.$width || "46.729vw"};
    gap: ${(props) => props.$gap || "2.336vw"};
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-self: center;
  flex-wrap: wrap;
  width: 65%;
  background-color: black;
  padding: 0.694vw;
  border-radius: 1.389vw;
  gap: 0.556vw;
  ${media.fullWidth} {
    gap: 8px;
    padding: 10px;
    border-radius: 20px;
  }
  
  ${media.tablet} {
    gap: 0.781vw;
    width: 75%;
    padding: 0.977vw;
    border-radius: 1.953vw;
  }
  
  ${media.mobile} {
    width:100%;
    gap: 1.869vw;
    padding: 2.336vw;
    border-radius: 4.673vw;
  }
`;
