import { useState } from "react";
import styled from "styled-components";
import media from "styles/media";
// import colors from "styles/colors";
import text from "styles/text";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      setEmailError(true);
    } else if (!password) {
      setPasswordError(true);
    }
    const data = {
      email,
      password,
    };
    try {
      const res = await axios.post("/api/userlogin", data);
      console.log("jwt user", res.data.user);
      return navigate("/");
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
  const HandleEmailChange = (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    const currentEmail = e.target.value;
    setIsValidEmail(regex.test(currentEmail));
    return setEmail(e.target.value.toLowerCase());
  };
  return (
    <Wrapper>
      <Form id="login-form">
        <FormHeader>User Login </FormHeader>
        <Email
          type="email"
          placeholder="Email"
          $validemail={isValidEmail}
          $iserror={emailError}
          onFocus={() => {
            setEmailError(false);
            setIsValidEmail(false);
            setPasswordError(false);
          }}
          onChange={(e) => HandleEmailChange(e)}
        />
        <Password
          type="password"
          placeholder="password"
          $iserror={emailError}
          $passworderror={passwordError}
          onFocus={() => {
            setEmailError(false);
            setPasswordError(false);
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={() => handleSubmit()}>
          Login
        </button>
        {emailError && <EmailError>Invalid email or login</EmailError>}
      </Form>
    </Wrapper>
  );
};

export default Login;
const EmailError = styled.div`
  width: 100%;
  text-align: center;
  color: hsla(350, 50%, 60%, 1);
`;

const Email = styled.input`
  border: ${(props) =>
    props.$iserror
      ? "2px solid red"
      : props.$validemail
      ? "2px solid hsla(135, 50%, 50%, 1)"
      : "unset"};
  color: ${(props) => (props.$iserror ? "red" : "unset")};
`;
const Password = styled(Email)`
  border: ${(props) => (props.$passworderror ? "2px solid red" : "unset")};
`;
const FormHeader = styled.h2`
  ${text.h2Chillax}
  margin-top:unset;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  width: fit-content;
  justify-content: center;
  flex-direction: column;
  gap: 0.694vw;
  margin: 3.958vw;
  padding: 3.472vw;
  border-radius: 8px;
  -webkit-box-shadow: 0px 0px 9px -3px #ffffff;
  box-shadow: 0px 0px 9px -3px #ffffff;
  ${media.fullWidth} {
    margin: 53px;
  }

  ${media.tablet} {
    margin: 9.766vw;
    padding: 4.883vw;
    border-radius: 0.781vw;
    gap: 0.977vw;
  }

  ${media.mobile} {
    margin: 11.682vw;
    padding: 11.682vw;
    border-radius: 1.869vw;
    gap: 2.336vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
