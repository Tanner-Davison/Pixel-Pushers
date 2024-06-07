import {useEffect, useState} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import ProfileBanner from './ProfileBanner';


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
    <ProfileBanner data={data}>

    </ProfileBanner>


    </Wrapper>
  )
};

export default Profile

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`