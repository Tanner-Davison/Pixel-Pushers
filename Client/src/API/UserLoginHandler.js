import axios from "axios";

export const login = async (
  email,
  setEmailError,
  setPasswordError,
  password,
  handleContextLogin,
) => {
  const data = {
    email,
    password,
  };
  try {
    const res = await axios.post("/pixel-pushers/user/login", data);
    handleContextLogin(res.data.user);
    console.log(res.data.message)
    ;
    return {user:res.data.user, message:res.data.message};
  } catch (error) {
    if (
      error.response.status === 409 ||
      error.response.status === 422 ||
      error.response.status === 401
    ) {
      setEmailError(true);
      setPasswordError(true);
    }
    return console.error("Error during signup:", error.response.status);
  }
};

export const logout =async(handleContextLogout, navigate)=>{
  try {
    const res = await axios.post("/pixel-pushers/user/logout", { withCredentials: true });
    if (res) {
      handleContextLogout();
      navigate("/login");
    }
  } catch (error) {
    console.error(error);
  }
}