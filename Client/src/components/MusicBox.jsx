import React from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import albumIcon from "../assets/albumIcon.png";
import mic from "../assets/mic.png";
import lastFm from "../assets/Lastfm-02.svg";
const MusicBox = ({ content, summary }) => {
  console.log(content);
  return (
    <Wrapper>
      <InfoWrap>
        <AlbumName>
          <IconContainer>
            <Icon src={albumIcon} alt={"album-icon"} />
          </IconContainer>
          Album :{" "}
        </AlbumName>
        <Indented>{content?.album[0]?.name}</Indented>
      </InfoWrap>
      <InfoWrap>
        <ArtistName>
          <IconContainer>
            <Icon src={mic} alt={"artist-icon"} />
          </IconContainer>
          Artist :{" "}
        </ArtistName>
        <Indented>{content?.album[0]?.artist}</Indented>
      </InfoWrap>
      <InfoWrap>
        <Visit>
          <IconContainer>
            <Icon src={lastFm} alt={"last-fm-logo"} />
          </IconContainer>
          Visit:{" "}
        </Visit>
        <Link href={content?.album[0]?.url}>
          <Indented>{`last.fm/${content?.album[0]?.artist}`}</Indented>
        </Link>
      </InfoWrap>
      {summary && (
        <InfoWrap>
          <About>About Artist:</About>
          <Summary dangerouslySetInnerHTML={{ __html: summary }} />
        </InfoWrap>
      )}
    </Wrapper>
  );
};

export default MusicBox;
const Icon = styled.img`
  width: 100%;
  height: 100%;
`;
const IconContainer = styled.div`
  width: 20px;
  height: 20px;
`;
const Summary = styled.p`
  ${text.bodyMChillax}
  padding-right:5px;
`;
const Indented = styled.p`
  text-indent: 10px;
`;
const Visit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  ${text.bodyMBold}
`;

const Link = styled.a`
  ${text.bodyM}
  font-style: italic !important;
`;
const AlbumName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  ${text.bodyMBold}
`;
const ArtistName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  ${text.bodyMBold}
`;
const About = styled.p`
  ${text.bodyMBold}
`;
const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  color: #f7f6f2;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
  padding: 10px 0px;
  gap: 15px;
  width: 55%;
  height: 100%;

  ${media.fullWidth} {
  }

  ${media.tablet} {
  }

  ${media.mobile} {
    flex-direction: column;
  }
`;
