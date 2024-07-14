import React from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import albumIcon from "../assets/albumIcon.png";
import mic from "../assets/mic.png";
import lastFm from "../assets/Lastfm-02.svg";
const MusicBox = ({ content, summary }) => {
  console.log(summary);
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
  width: 1.389vw;
  height: 1.389vw;
  ${media.fullWidth} {
    width: 20px;
    height: 20px;
  }

  ${media.tablet} {
    width: 1.953vw;
    height: 1.953vw;
  }

  ${media.mobile} {
    width: 4.673vw;
    height: 4.673vw;
  }
`;
const Summary = styled.p`
  ${text.bodyMChillax}
  padding-right:5px;
`;
const Indented = styled.p`
  text-indent:2.083vw;
  ${text.bodyMBoldChillax}
  ${media.fullWidth} {
    text-indent:30px;
  }

  ${media.tablet} {
    text-indent:2.93vw;
  }

  ${media.mobile} {
    text-indent:7.009vw;
  }
`;
const Visit = styled.div`
  ${text.bodyMBold}
  display: flex;
  align-items: center;
  justify-content: center;
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

const Link = styled.a`
  ${text.bodyM}
  font-style: italic !important;
`;
const AlbumName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${text.bodyMBold}
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
const ArtistName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${text.bodyMBold}
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
  width: 55%;
  height: 100%;
  padding: 0.694vw 0vw;
  gap: 0.556vw;

  ${media.fullWidth} {
    padding: 10px 0px;
    gap: 8px;
  }

  ${media.tablet} {
    padding: 0.977vw 0vw;
    gap: 0.781vw;
  }

  ${media.mobile} {
    padding: 2.336vw 0vw;
    gap: 1.869vw;
    flex-direction: column;
  }
`;
