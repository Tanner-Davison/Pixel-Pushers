import styled from "styled-components";
import AddImage from '../../assets/AddImage.webp';
//eslint-disable-next-line
const ProfileBanner = ({ data }) => {
  console.log(data);

  return (
    <Wrapper>
      <ProfileImage src={AddImage} alt={"tempImg"} />
      <AddBackground>Change Background</AddBackground>
    </Wrapper>
  );
};

export default ProfileBanner;
const AddBackground= styled.button`
    display: flex;
    align-items: center;
    height:30px;
    align-self: flex-end;
    margin:10px;
    margin-left:auto;
    margin-right:25px;

`
const ProfileImage = styled.img`
  position: relative;
  align-self: flex-end;
  bottom:-70px;
  width: 150px;
  height: 150px;
  border-radius: 100px;
  margin-left: 50px;
  z-index: 2;
  background-color: red;
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
