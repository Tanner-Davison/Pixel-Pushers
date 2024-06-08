import { useState } from "react";
import styled from "styled-components";
import AddImage from "../../assets/AddImage.webp";
import loadingGiphy from "../../assets/loadingGiphy.webp";
import uploadPhotoSvg from "../../assets/uploadPhotoSvg.svg";
import media from "../../styles/media";
import text from "../../styles/text";

//eslint-disable-next-line
const ProfileBanner = ({ data, setPhotoChange }) => {
  const { profileImageUrl = "" } = data || {};
  const [photo, setPhoto] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVisibility = () => {
    const profileImg = document.querySelector(".profile-img");
    profileImg.style.filter = "brightness(50%)";
    setIsVisible(true);
  };

  const handleMouseLeave = (e) => {
    if (e.currentTarget.classList.value.includes("upload-btn")) return;
    const profileImg = document.querySelector(".profile-img");
    profileImg.style.filter = "brightness(100%)";
    return setIsVisible(false);
  };

  const handlePhotoUpload = () => {
    const fileUploader = document.querySelector("#hidden-file-upload");
    fileUploader.click();
  };

  const handleFileChange = (event) => {
    handleMouseLeave;
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setLoading(true);
      fetch("/api/uploadProfilePhoto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ profilePhoto: dataUrl }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((dataRes) => {
          setLoading(false);
          setPhoto(dataRes.profileImageUrl);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Wrapper>
      <ProfileImageWrapper
        className="image-wrapper"
        onMouseEnter={handleVisibility}
        onMouseLeave={(e) => handleMouseLeave(e)}
      >
        {!profileImageUrl && !photo && !loading && (
          <ProfileImage
            className="profile-img"
            src={AddImage}
            alt={"tempImg"}
          />
        )}
        {profileImageUrl && !photo && !loading && (
          <ProfileImage
            className="profile-img"
            src={profileImageUrl}
            alt={"tempImg"}
          />
        )}
        {photo && !loading && (
          <ProfileImage className="profile-img" src={photo} alt={"tempImg"} />
        )}
        {loading && (
          <ProfileImage
            className="profile-img"
            src={loadingGiphy}
            alt={"loading"}
            style={{minHeight:'25px',height:'75px', width:'75px'}}
          />
        )}
        <UploadPhotoBtn
          className="upload-btn"
          onClick={handlePhotoUpload}
          onMouseEnter={() => handleVisibility()}
          $visible={isVisible}
          src={uploadPhotoSvg}
          alt={"upload-photo"}
        />
        <input
          type="file"
          id="hidden-file-upload"
          accept="image/png, image/jpeg, image/webp"
          onChange={(e) => handleFileChange(e)}
          style={{ display: "none" }}
        />
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
  cursor: pointer;
  display: flex;
  background-image: ${uploadPhotoSvg};
  background-size: 35px;
  background-repeat: no-repeat;

  opacity: ${(props) => (props.$visible ? "1" : "0")};
  bottom: 0px;
  right: 55px;
  top: 55px;
  width: 35px;
  height: 35px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  ${media.fullWidth} {
  }

  ${media.tablet} {
  }

  ${media.mobile} {
    width: 7.009vw;
    height: 7.009vw;
    top: 9.346vw;
    left: 9.346vw;
  }
`;
const ProfileImage = styled.img`
  cursor: pointer;
  position: relative;
  width: auto;
  width: 100%;
  min-height: 100%;
  border-radius: 5%;

  transition: filter 0.3s ease-in-out;
  &:hover {
    filter: brightness(50%);
  }
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
  align-items: center;
  justify-content: center;
  width: 10.417vw;
  height: 10.417vw;
  border: 3px solid white;
  box-sizing: border-box;
  overflow: hidden;
  bottom: -4.861vw;
  margin-left: 2.778vw;
  background-color: black;
  border-radius: 50%;
  ${media.fullWidth} {
    bottom: -70px;
    margin-left: 40px;
  }

  ${media.tablet} {
    bottom: -6.836vw;
    margin-left: 3.906vw;
  }

  ${media.mobile} {
    bottom: -50px;
    margin-left: 25px;
    width: 23.364vw;
    height: 23.364vw;
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
