import {useEffect, useState} from 'react'
import styled from 'styled-components';
import axios from 'axios';

const Profile = () => {

  const [data,setData] = useState(null)

   useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/userData', { withCredentials: true });
        setData(response.data.user); 
         
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);
useEffect(()=>{
  console.log(data)
},[data])
  return (
    <Wrapper>
    <ProfileBanner>

    </ProfileBanner>


    </Wrapper>
  )
};

export default Profile

const ProfileBanner = styled.div`
  display: flex;

`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

`