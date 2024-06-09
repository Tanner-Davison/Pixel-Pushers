import axios from 'axios';

export const createUser = async (data, navigate, email, password, setUserEmailExists)=>{
    try {
        const res = await axios.post("/pixel-pushers/usersignup", data);
        console.log(res.data);
        return navigate("/login", { email, password });
      } catch (error) {
        if (error.response.status === 409) {
          setUserEmailExists(true);
        }
        console.error("Error during signup:", error.response.status);
      }
}