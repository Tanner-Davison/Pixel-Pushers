import React, { useState, useEffect } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import eyes from "../assets/prettyEyes.png";
import getMedia from "../utils/getMedia";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { fetchArtistData } from "../API/music";
import MusicBox from "./MusicBox";
import recordImg from "../assets/recordVinyl.png";
import DefaultMusicBoxWrapper from "./DefaultMusicBoxWrapper";
const MasonryGrid = () => {
  const masonryScope = document.querySelector(".masonry-grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [albumInfo, setAlbumInfo] = useState({});
  const [selected, setSelected] = useState("album");

  const handleMusicSearch = async () => {
    if (searchQuery === "") {
      return;
    }
    const infoResponse = await fetchArtistData(searchQuery, selected);
    if (infoResponse) {
      console.log(infoResponse);
      setAlbumInfo(infoResponse);
    }
  };

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
    { scope: masonryScope }
  );

  return (
    <Wrapper className={"masonry-grid"}>
      <Left>
        <Boxes
          $radius={"20px"}
          $backgroundcolor={"transparent"}
          $noHover={true}
          $flex={getMedia(25, 15, 15, 1)}
          $width={getMedia("350px", "24.306vw", "20.063vw", "23.364vw")}
          $height={getMedia("250px", "17.361vw", "27.778vw", "200px")}
          $align={"flex-end"}
          $textalign={"flex-start"}
          $padding={getMedia("3px", "0.208vw", "0.293vw", "1.402vw")}
          $justify={"space-between"}
        >
          {!albumInfo.img && (
            <>
              <Image
                className={"default-record"}
                src={recordImg}
                alt={"vinyl-record"}
                $height={"100%"}
                $width={getMedia("85%", "85%", "100%", "85%")}
                $left={getMedia("-284px", "-284px", "-160px", "-164px")}
                $noHover
              />
              <DefaultMusicBoxWrapper />
            </>
          )}
          {albumInfo.img && (
            <>
              <Image
                src={albumInfo?.img}
                alt={"last.fm-artist-img"}
                $height={"100%"}
                $width={!albumInfo.info ? "100%" : "42%"}
                $cover={!albumInfo.info ? "cover" : "contain"}
              />
              {albumInfo.info && (
                <MusicBox
                  content={albumInfo?.info?.info?.results?.albummatches}
                  summary={albumInfo?.summary}
                />
              )}
            </>
          )}
        </Boxes>
        <Boxes
          $backgroundcolor={"transparent"}
          $flex={2}
          $padding={getMedia(
            "0px 10px",
            "0vw 0.394vw",
            "0vw 0.377vw",
            "0vw 0.536vw"
          )}
          $gap={"8px"}
          $direction={"column"}
          $justify={"space-between"}
          $width={getMedia("300px", "300px", "300px", "300px")}
        >
          <SmallBox
            $radius={getMedia(
              "13px 13px 5px 5px ",
              "0.903vw 0.903vw 0.347vw 0.347vw ",
              "1.27vw 1.27vw 0.488vw 0.488vw ",
              "3.037vw 3.037vw 1.168vw 1.168vw "
            )}
            $backgroundcolor={"  #535353"}
          >
            Hello world
          </SmallBox>
          <SmallBox $radius={"5px"} $backgroundcolor={"#434343  "}>
            Hello world
          </SmallBox>
          <SmallBox
            $radius={getMedia(
              "5px 5px 13px 13px",
              "0.347vw 0.347vw 0.903vw 0.903vw",
              "0.488vw 0.488vw 1.27vw 1.27vw",
              "1.168vw 1.168vw 3.037vw 3.037vw"
            )}
            $backgroundcolor={"#343434"}
          >
            Hello world
          </SmallBox>
        </Boxes>
        <Boxes
        $noHover={true}
          $radius={"15px"}
          $backgroundcolor={"#1E1E1E"}
          $width={getMedia("200px", "13.889vw", "19.531vw", "100%")}
        >
          <InputContainer>
            <ToggleContainer>
              <ToggleButton
                active={selected === "artist"}
                onClick={() => setSelected("artist")}
              >
                Artist
              </ToggleButton>
              <ToggleButton
                active={selected === "album"}
                onClick={() => setSelected("album")}
              >
                Album
              </ToggleButton>
            </ToggleContainer>
            <SearchContainer>
              <Input
                type="text"
                value={searchQuery}
                placeholder={
                  selected === "artist" ? "Artist Lookup..." : "Album Lookup .."
                }
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={handleMusicSearch}>Search</Button>
            </SearchContainer>
          </InputContainer>
        </Boxes>
        <Boxes
          $radius={"15px"}
          $flex={3.6}
          $height={"100px"}
          $width={getMedia("300px", "20.833vw", "19.297vw", "45.093vw")}
          $backgroundcolor={"#FF6663"}
        >
          <Small>world how are you today </Small>
        </Boxes>

        <Boxes
          className={"angry-div"}
          $radius={getMedia("15px", "0.903vw", "1.465vw", "3.505vw")}
          $width={getMedia("150px", "6.944vw", "7.324vw", "32.083vw")}
          $backgroundcolor={"#1B1B1B"}
          $height={"100px"}
          $justify={"center"}
        >
          <Image
            className={"angry-face"}
            src={eyes}
            $width={getMedia("50px", "120px", "11.719vw", "50px")}
            alt={"eyespeeking"}
            $align={"center"}
          />
        </Boxes>

        <Boxes
          $radius={"13px"}
          $backgroundcolor={` #412485`}
          $flex={1}
          $width={getMedia("100%", "100%", "100%", "60%")}
        >
          world
        </Boxes>
      </Left>
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
  width: ${(props) => props.$width || "13.084vw"};
  align-self: ${(props) => props?.$align || "unset"};
  border-radius: 13px;
  top: ${(props) => props.$top || "unset"};
  left: ${(props) => props.$left || "unset"};
  object-fit: ${(props) => props.$cover || "fill"};

  ${media.fullWidth} {
    width: ${(props) => props.$width || "190px"};
    height: ${(props) => props.$height || "190px"};
  }

  ${media.tablet} {
    width: ${(props) => props.$width || "21.484vw"};
    height: ${(props) => props.$height || "21.531vw"};
  }

  ${media.mobile} {
    height: ${(props) => props.$height || "51.402vw"};
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
  flex: 1;
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
    &:hover {
      transform: scale(1);
    }
    transition: unset;
  }
`;
const Boxes = styled.div`
  position: relative;
  ${(props) => props.$fontsize || `${text.bodyM}`};
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  align-items: ${(props) => props.$align || "center"};
  justify-content: ${(props) => props.$justify || "flex-start"};
  text-align: ${(props) => props?.$textalign || "center"};
  background-color: ${(props) => props.$backgroundcolor || "white"};
  height: ${(props) => props.$height || "auto"};
  flex: ${(props) => props.$flex || "unset"};
  padding: ${(props) => props.$padding || "0.694vw"};
  border-radius: ${(props) => props.$radius || "0vw"};
  min-width: ${(props) => props.$width || "6.944vw"};
  gap: ${(props) => props.$gap || "0.694vw"};
  overflow: hidden;
  z-index: 1;
  transition: transform 0.2s ease-in-out, z-index 0.3s ease-in-out;
  &:hover {
    transform: ${(props) => (props.$noHover ? "unset" : "scale(1.1)")};
    overflow: ${(props) => (props.$noHover ? "hidden" : "visible")};
    z-index: ${(props) => (props.$noHover ? "unset" : "20")};
  }

  ${media.fullWidth} {
    padding: ${(props) => props.$padding || "10px"};
    border-radius: ${(props) => props.$radius || "0px"};
    min-width: ${(props) => props.$width || "200px"};
    gap: ${(props) => props.$gap || "10px"};
  }

  ${media.tablet} {
    padding: ${(props) => props.$padding || "0.977vw"};
    border-radius: ${(props) => props.$radius || "0vw"};
    min-width: ${(props) => props.$width || "19.531vw"};
    gap: ${(props) => props.$gap || "0.977vw"};
  }

  ${media.mobile} {
    padding: ${(props) => props.$padding || "2.336vw"};
    border-radius: ${(props) => props.$radius || "0vw"};
    min-width: ${(props) => props.$width || "100px"};
    gap: ${(props) => props.$gap || "2.336vw"};
  }
`;
const Input = styled.input`
  border-top-left-radius: 0vw;
  background-color: #535353;

  ${media.fullWidth} {
    border-top-left-radius: 0px;
  }
`;
const Button = styled.button`
  background-color: #353839;
  border: 1px outset black;
`;
const SearchContainer = styled.div`
  display: flex;
  gap: 0.694vw;

  ${media.fullWidth} {
    gap: 10px;
  }

  ${media.tablet} {
    gap: 0.977vw;
  }

  ${media.mobile} {
    gap: 2.336vw;
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ToggleContainer = styled.div`
  display: flex;
  :first-child {
    border-top-left-radius: 0.694vw;
    ${media.fullWidth} {
      border-top-left-radius: 10px;
    }

    ${media.tablet} {
      border-top-left-radius: 0.977vw;
    }

    ${media.mobile} {
      border-top-left-radius: 2.336vw;
    }
  }
  :last-child {
    border-top-right-radius: 0.694vw;
    ${media.fullWidth} {
      border-top-right-radius: 10px;
    }

    ${media.tablet} {
      border-top-right-radius: 0.977vw;
    }

    ${media.mobile} {
      border-top-right-radius: 2.336vw;
    }
  }
`;

const ToggleButton = styled.div`
  ${text.bodySChillax}
  padding: 0px 5px;
  margin: 0px;

  cursor: pointer;

  background-color: ${(props) => (props.active ? "#99C24D" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};

  &:hover {
    background-color: ${(props) =>
      props.active ? `${colors.primaryPurple}` : "#f0f0f0"};
  }
`;
const Left = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 65%;
  background-color: #0e0e10;
  padding: 1.3vw 0.794vw;
  border-radius: 1.389vw;
  gap: 0.903vw 0.347vw;
  z-index: 1;
  ${media.fullWidth} {
    gap: 13px 5px;
    padding: 10px;
    border-radius: 20px;
    width: 65%;
  }

  ${media.tablet} {
    gap: 1.27vw 0.488vw;
    width: 75%;
    padding: 0.977vw;
    border-radius: 1.953vw;
  }

  ${media.mobile} {
    width: 100%;
    gap: 3.037vw 1.168vw;
    padding: 2.336vw;
    border-radius: 4.673vw;
  }
`;
const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
  ${media.fullWidth} {
    width: 1440px;
  }

  ${media.tablet} {
    width: 100vw;
  }

  ${media.mobile} {
    width: 100vw;
  }
`;
