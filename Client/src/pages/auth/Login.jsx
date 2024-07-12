import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { login } from "../../API/UserLoginHandler";
import styled from "styled-components";
import media from "styles/media";
import text from "styles/text";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const { handleContextLogin } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      setEmailError(true);
    } else if (!password) {
      setPasswordError(true);
    }
    const response = await login(
      email,
      setEmailError,
      setPasswordError,
      password,
      handleContextLogin,
      navigate
    );
    if (response.message === "Login successful") {
      handleContextLogin(response.user);
      navigate("/profile");
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
        <FormHeader>User Login</FormHeader>
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
        <LoginButton type="button" onClick={() => handleSubmit()}>
          Login
        </LoginButton>
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
const LoginButton = styled.button``;
const Email = styled.input`
  border: ${(props) =>
    props.$iserror
      ? "2px solid red"
      : props.$validemail
      ? "2px solid hsla(135, 50%, 50%, 1)"
      : "2px solid transparent"};
  color: ${(props) => (props.$iserror ? "red" : "unset")};
  box-sizing: border-box;
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
  gap: 1.694vw;
  margin: 3.958vw;
  padding: 3.472vw;
  border-radius: 2.083vw;
  -webkit-box-shadow: 0px 0px 9px -3px #ffffff;
  box-shadow: 0px 0px 9px -3px #ffffff;
  ${media.fullWidth} {
    margin: 53px;
    border-radius: 30px;
  }

  ${media.tablet} {
    margin: 9.766vw;
    padding: 4.883vw;
    border-radius: 2.93vw;
    gap: 0.977vw;
  }

  ${media.mobile} {
    margin: 11.682vw;
    padding: 11.682vw;
    border-radius: 7.009vw;
    gap: 2.336vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
