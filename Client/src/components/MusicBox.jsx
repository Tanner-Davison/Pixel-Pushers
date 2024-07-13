import React from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";

const MusicBox = ({ content }) => {
  console.log(content);
  return (
    <Wrapper>
      <InfoWrap>
        <AlbumName> Album : </AlbumName>
        <Indented>{content?.album[0]?.name}</Indented>
      </InfoWrap>
      <InfoWrap>
        <ArtistName>Artist : </ArtistName>
        <Indented>{content?.album[0]?.artist}</Indented>
      </InfoWrap>
      <InfoWrap>
        <Visit>Visit: </Visit>
        <Link href={content?.album[0]?.url}>
          <Indented>{`last.fm/${content?.album[0]?.artist}`}</Indented>
        </Link>
      </InfoWrap>
    </Wrapper>
  );
};

export default MusicBox;
const Indented = styled.p`
  text-indent: 10px;
`;
const Visit = styled.p`
  ${text.bodyMBold}
`;

const Link = styled.a`
  ${text.bodyM}
  font-style: italic !important;
`;
const AlbumName = styled.p`
  ${text.bodyMBold}
`;
const ArtistName = styled.p`
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
  justify-content: center;
  align-self: center;
  gap: 15px;
  width: 45%;

  ${media.fullWidth} {
  }

  ${media.tablet} {
  }

  ${media.mobile} {
    flex-direction: column;
  }
`;
