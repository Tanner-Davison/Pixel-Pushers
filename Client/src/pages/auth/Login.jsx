import { useState } from "react";
import styled from "styled-components";
import media from "styles/media";
// import colors from "styles/colors";
import text from "styles/text";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      email,
      password,
    };
    try {
      const res = await axios.post("/api/userlogin", data);
      console.log("jwt user", res.data.user);
      return navigate("/");
    } catch (error) {
      if (error.response.status === 409 || error.response.status === 402) {
        setEmailError(true);
      } else if (error.response.status === 401) {
        setPasswordError(true);
      }
      return console.error("Error during signup:", error.response.status);
    }
  };

  return (
    <Wrapper>
      <Form id="login-form">
        <FormHeader>Sign In </FormHeader>
        <Email
          type="email"
          placeholder="Email"
          $iserror={emailError}
          onFocus={() => setEmailError(false)}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
        <Password
          type="password"
          placeholder="password"
          $iserror={emailError}
          $passwordError={passwordError}
          onFocus={() =>{ setEmailError(false); setPasswordError(false)}}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={() => handleSubmit()}>
          Submit
        </button>
        {emailError && (
          <EmailError>
            Email already in use. Try again or <a>login</a>.
          </EmailError>
        )}
      </Form>
    </Wrapper>
  );
};

export default Login;
const EmailError = styled.div`
  width: 100%;
  text-align: center;
`;

const Email = styled.input`
  border: ${(props) => (props.$iserror ? "2px solid red" : "unset")};
  color: ${(props) => (props.$iserror ? "red" : "unset")};
`;
const Password = styled(Email)`
  border: ${(props) => (props.$passwordError ? "2px solid red" : "unset")};
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
