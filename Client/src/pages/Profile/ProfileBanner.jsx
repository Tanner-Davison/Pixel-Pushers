import styled from "styled-components";
import AddImage from "../../assets/AddImage.webp";
import uploadPhotoSvg from "../../assets/uploadPhotoSvg.svg";
import media from "../../styles/media";
import text from "../../styles/text";

//eslint-disable-next-line
const ProfileBanner = ({ data }) => {
  return (
    <Wrapper>
      <ProfileImageWrapper>
        <ProfileImage src={AddImage} alt={"tempImg"} />
        <UploadPhotoBtn src={uploadPhotoSvg} alt={"upload-photo"} />
      </ProfileImageWrapper>
      <AddBackground>Change Background</AddBackground>
    </Wrapper>
  );
};

export default ProfileBanner;
const AddBackground = styled.button`
  display: flex;
  align-items: center;
  height: 30px;
  align-self: flex-end;
  margin: 10px 25px 10px auto;
  border: none;
  outline: none;
  ${media.fullWidth} {
  }

  ${media.tablet} {
  }

  ${media.mobile} {
    ${text.bodyXSBold}
  }
`;
const UploadPhotoBtn = styled.img`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 35px;
  height: 35px;
  transition:transform .3s ease-in-out;
  &:hover{
    cursor: pointer;
    transform: scale(1.1);
  }
`;
const ProfileImage = styled.img`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius:50%;
  border:3px solid white;
  ${media.fullWidth} {
  }

  ${media.tablet} {
  }

  ${media.mobile} {
    width: 100px;
    height: 100px;
  }
`;
const ProfileImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-self: flex-end;
  bottom: -4.861vw;
  margin-left:2.778vw;


  ${media.fullWidth} {
    bottom: -70px;
    margin-left:40px;
  }

  ${media.tablet} {
    bottom: -6.836vw;
    margin-left:3.906vw;
  }

  ${media.mobile} {
    bottom: -50px;
    margin-left: 25px;
  }
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 90%;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  outline: 2px solid blue;
  height: 300px;
  z-index: 1;
`;
