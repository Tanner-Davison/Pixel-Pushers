import React, { useState } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { username } from "../../HelperFunctions/username";
import IntroSettingsModal from "./IntroSettingsModal";

const ProfileIntro = ({ userData }) => {
  //prettier-ignore
  const { firstName = "", lastName = "", headline = "", selected = "", location='' } = userData || {};

  const userName = `${username(firstName)}${username(lastName)}`;
  const [editorVisible, setEditorVisible] = useState(false);
  const [elementClicked, setElementClicked] = useState("");
  const [columnHover, setColumnHover] = useState(false);
  const workLocation = location
    ? `${location?.city}, ${location?.region}`
    : "[Add Work Location]";
  const editor = (value = "", copy = "") => {
    return <Edit onClick={() => handleEditClick(value)}>{copy}</Edit>;
  };
  const handleEditClick = (value = "") => {
    setEditorVisible(!editorVisible);
    return setElementClicked(value);
  };
  return (
    <>
      {editorVisible && (
        <IntroSettingsModal
          focused={elementClicked}
          setEditorVisible={setEditorVisible}
          userData={userData}
          setElementClicked={setElementClicked}
          setIntroEditor={setEditorVisible}
        />
      )}
      <UserInfo className="profile-intro-wrapper">
        <InfoDiv className="user-info-div">
          <Username>{userName}</Username>
          <HeadlineDiv
            onMouseEnter={() => setColumnHover("headline")}
            onMouseLeave={() => setColumnHover("")}
          >
            <Headline>{headline || "Add user headline | Career"}</Headline>
            <ActionButton>
              {columnHover === "headline" && editor("headline", "+ headline")}{" "}
            </ActionButton>
          </HeadlineDiv>

          <JobStatusDiv
            $status={selected}
            onMouseEnter={() => setColumnHover("job-status")}
            onMouseLeave={() => setColumnHover("")}
          >
            <StatusLabel>Job Status : </StatusLabel>
            {<Selected $status={selected}>{selected || "unset"}</Selected>}

            <ActionButton>
              {columnHover === "job-status" &&
                editor(
                  "job-status",
                  selected ? "+ Change Status" : "+ job status"
                )}
            </ActionButton>
          </JobStatusDiv>

          <LocationDiv
            onMouseEnter={() => setColumnHover("location")}
            onMouseLeave={() => setColumnHover("")}
          >
            <Location>{workLocation || "Update Location"}</Location>
            {columnHover === "location" &&
              editor("location", location ? "+ Edit Location" : "+ location")}
          </LocationDiv>
        </InfoDiv>
        <Friends>Hello</Friends>
      </UserInfo>
    </>
  );
};

export default ProfileIntro;
const Friends = styled.div``;
const ActionButton = styled.span``;
const Edit = styled.button`
  ${text.bodyS};
  height: 100%;
  padding: 0.278vw 0.694vw;
  color: ${colors.primaryPurple};
  text-wrap: nowrap;
  &:hover {
    color: ${colors.darkPurple};
  }
  ${media.fullWidth} {
    padding: 4px 10px;
  }

  ${media.tablet} {
    padding: 0.391vw 0.977vw;
  }

  ${media.mobile} {
    padding: 0.935vw 2.336vw;
  }
`;
const Info = styled.p`
  ${text.bodyS}
`;
const InfoColumn = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 0.694vw;
  min-height: 2.431vw;
  ${media.fullWidth} {
    gap: 10px;
    min-height: 35px;
  }

  ${media.tablet} {
    gap: 0.977vw;
    min-height: 3.418vw;
  }

  ${media.mobile} {
    gap: 2.336vw;
    min-height: 8.178vw;
  }
`;
const HeadlineDiv = styled(InfoColumn)`
  cursor: pointer;
  ${text.bodySBold}
  border-left: 0.139vw solid ${colors.navGreen};
  padding-left: 0.694vw;

  ${media.fullWidth} {
    padding-left: 10px;
  }

  ${media.tablet} {
    padding-left: 0.977vw;
  }

  ${media.mobile} {
    padding-left: 3.336vw;
  }
`;
const LocationDiv = styled(InfoColumn)`
  cursor: pointer;
  width: fit-content;
`;
const JobStatusDiv = styled(InfoColumn)`
  position: relative;
  cursor: default;
  ${text.bodySBold}
  border-left: ${(props) =>
    props.$status === "Employed"
      ? `3px solid ${colors.darkYellow}`
      : props.$status === "Open to work"
      ? `2px solid ${colors.navGreen}`
      : props.$status === "Self Employed"
      ? `3px solid ${colors.darkTeal}`
      : props.$status === "Retired"
      ? `3px solid ${colors.darkOrange}`
      : `2px solid ${colors.white}`};
  padding-left: 0.694vw;

  ${media.fullWidth} {
    padding-left: 10px;
  }

  ${media.tablet} {
    padding-left: 0.977vw;
  }

  ${media.mobile} {
    padding-left: 3.336vw;
  }
`;
const Location = styled(Info)`
  ${text.bodyMChillax}
`;
const Selected = styled(Info)`
  ${text.bodySChillax};
  color: ${(props) =>
    props.$status === "Employed"
      ? `${colors.darkYellow}`
      : props.$status === "Open to work"
      ? `${colors.navGreen}`
      : props.$status === "Self Employed"
      ? `${colors.darkTeal}`
      : props.$status === "Retired"
      ? `${colors.darkOrange}`
      : `${colors.white}`};
`;
const StatusLabel = styled(Info)``;

const Headline = styled.p`
  width: fit-content;
`;
const Username = styled.h3`
  ${text.h3}
  margin-bottom:1.389vw;

  ${media.fullWidth} {
    margin-bottom: 20px;
  }

  ${media.tablet} {
    margin-bottom: 1.953vw;
  }

  ${media.mobile} {
    margin-bottom: 4.673vw;
  }
`;
const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 39.236vw;
  padding-left: 1.042vw;
  margin-left: 1.042vw;
  gap: 0.694vw;
  ${media.fullWidth} {
    width: 565px;
    border-left: 2px solid ${colors.navGreen};
    padding-left: 15px;
    margin-left: 15px;
    gap: 10px;
  }

  ${media.tablet} {
    width: 350px;
    padding-left: 1.465vw;
    margin-left: 1.465vw;
    gap: 0.977vw;
  }

  ${media.mobile} {
    padding-left: 2.505vw;
    margin-left: 0.98vw;
    gap: 2.336vw;
    width: 85vw;
  }
`;
const UserInfo = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: row;
  width: fit-content;
  margin: 5.903vw 0vw 0vw 12.5vw;
  padding-left: 6.597vw;

  ${media.fullWidth} {
    margin: 85px 0px 0px 180px;
    padding-left: 95px;
  }

  ${media.tablet} {
    margin: 9.766vw 0vw 0vw 6.5vw;
    padding-left: 8.766vw;
  }

  ${media.mobile} {
    margin: 12.692vw 0vw 0vw 0vw;
    padding-left: 7.682vw;
    gap: 5.841vw;
    flex-direction: column;
  }
`;
