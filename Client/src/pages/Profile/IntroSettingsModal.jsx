import React, { useState, useEffect } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { fetchUserLocation } from "../../API/UserData";
import { updateUserData } from "../../API/UserData";

const IntroSettingsModal = ({
  setIntroEditor,
  focused,
  setElementClicked,
  setEditorVisible,
  userData,
}) => {
  const [focus, setFocus] = useState(focused || false);
  const [inputLocation, setInputLocation] = useState("");
  const [headline, setHeadline] = useState(userData.headline || "");
  const [selected, setSelected] = useState(userData.selected || "");
  const [location, setLocation] = useState("");

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIntroEditor(false);
      setElementClicked("");
    }
  };

  const handleSubmit = async () => {
    const data = {
      headline: headline,
      selected: selected,
      location: location,
    };
    const response = await updateUserData(data);
    if (response) {
      console.log("running");
      setEditorVisible(false);
      return window.location.reload();
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const userLocation = await fetchUserLocation();
      if (userLocation) {
        setLocation(userLocation);
        setInputLocation(`${userLocation.city}, ${userLocation.region}`);
      }
    };

    fetchLocation();
  }, []);

  return (
    <Wrapper className="intro_editor_modal" onClick={handleOutsideClick}>
      <Form className="noClick">
        <Title>Update Profile</Title>
        <FormInputs>
          <HeadlineDiv $focus={focus === "headline"}>
            <p>Profile Headline</p>
            <InputHeadline
              $focus={focus === "headline"}
              type="text"
              maxLength={40}
              onFocus={() => setFocus("headline")}
              name="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              id="profile-info-headline"
            />
          </HeadlineDiv>
          <JobStatusDiv $focus={focus === "job-status"}>
            <SelectDiv>Job Status</SelectDiv>
            <Select
              $focus={focus === "job-status"}
              onFocus={() => setFocus("job-status")}
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value={"N/A"}>N/A</option>
              <option value="Employed">Employed</option>
              <option value="Open to work">Open to work</option>
              <option value="Self Employed">Self Employed</option>
              <option value="Retired">Retired</option>
            </Select>
          </JobStatusDiv>
          <LocationDiv $focus={focus === "location"}>
            <LocationLabel>Work Location</LocationLabel>
            <IPLocation
              $focus={focus === "location"}
              onFocus={() => setFocus("location")}
              onChange={(e) => setInputLocation(e.target.value)}
              value={inputLocation}
            />
          </LocationDiv>
          <UpdateBtn onClick={handleSubmit}>Update</UpdateBtn>
        </FormInputs>
      </Form>
    </Wrapper>
  );
};

export default IntroSettingsModal;
const UpdateBtn = styled.button`
position: absolute;
  border: 0.069vw ridge ${colors.yellow500};
  color: ${colors.yellow400};
  bottom:2.083vw;
  right:3.472vw;
  ${media.fullWidth} {
    border: 1px ridge ${colors.yellow500};
    bottom:30px;
  right:50px;
  }
  
  ${media.tablet} {
    border: 0.098vw ridge ${colors.yellow500};
    bottom:2.93vw;
  right:4.883vw;
  }
  
  ${media.mobile} {
    border: 0.234vw ridge ${colors.yellow500};
    bottom:5.009vw;
  right:5.682vw;
  }
`;
const IPLocation = styled.input`
  border: 1px solid
    ${(props) => (props.$focus ? `${colors.navGreen}` : `unset`)};
`;

const Select = styled.select`
  ${text.bodyM}
  border-radius: 0.556vw;
  padding: 5px;
  border: 1px solid
    ${(props) => (props.$focus ? `${colors.navGreen}` : `unset`)};
  ${media.fullWidth} {
    border-radius: 8px;
    padding: 5px;
  }

  ${media.tablet} {
    border-radius: 0.781vw;
    padding: 0.488vw;
  }

  ${media.mobile} {
    border-radius: 1.869vw;
    padding: 1.168vw;
  }
`;

const Label = styled.p`
  ${text.bodySBold}
`;

const LocationLabel = styled(Label)``;
const InputDiv = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-left: 8px;

  ${text.bodySBold}
  gap:1.042vw;
  ${media.fullWidth} {
    gap: 15px;
  }

  ${media.tablet} {
    gap: 1.465vw;
  }

  ${media.mobile} {
    gap: 2.336vw;
  }
`;
const InputHeadline = styled.input`
  border: 1px solid
    ${(props) => (props.$focus ? `${colors.navGreen}` : `unset`)};
`;

const JobStatusDiv = styled(InputDiv)`
  border-left: 3px solid
    ${(props) =>
      props.$focus ? `${colors.navGreen}` : `transparent`};
      transition:border .3s ease-in-out;
`;

const HeadlineDiv = styled(InputDiv)`
  border-left: 3px solid
    ${(props) =>
      props.$focus ? `${colors.navGreen}` : `transparent`};
      transition:border .3s ease-in-out;
`;

const SelectDiv = styled(InputDiv)``;

const Title = styled.h2`
  ${text.h2Chillax}
  height: fit-content;
`;

const LocationDiv = styled(InputDiv)`
  border-left: 3px solid
    ${(props) =>
      props.$focus ? `${colors.navGreen}` : `transparent`};
      transition:border .3s ease-in-out;
`;

const FormInputs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-wrap: nowrap;
  gap: 1.736vw;
  ${media.fullWidth} {
    gap: 25px;
  }
  
  ${media.tablet} {
    gap: 2.441vw;
  }
  
  ${media.mobile} {
    gap: 4.841vw;
  }
`;

const Form = styled.div`
position: relative;
  display: flex;
  flex-direction: column;
  background-color: #242424;
  gap: 1.736vw;
  width: 55.556vw;
  height: auto;
  min-height: 27.778vw;
  border-radius: 1.556vw;
  padding: 3.472vw;
  -webkit-box-shadow: 0px 0px 8px -3px ${colors.navGreen};
  box-shadow: 0px 0px 8px -1px ${colors.primaryPurple};
  border: 2px solid black;
  ${media.fullWidth} {
    padding: 50px;
    width: 800px;
    border-radius: 8px;
    gap: 25px;
  }

  ${media.tablet} {
    width: 78.125vw;
    gap: 2.441vw;
    border: 0.195vw solid black;
    padding: 4.883vw;
    top:-15vh;
  }

  ${media.mobile} {
    padding: 20px 5px;
    width: 90%;
    min-height: 88.785vw;
    gap: 5.841vw;
    text-align: center;
    
  }
`;

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  top: 3.5%;
  justify-content: center;
  width: 100%;
  height: 100vh;
  z-index: 100;
`;
