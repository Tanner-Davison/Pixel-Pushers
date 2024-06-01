import { useState } from "react";
import styled from "styled-components";
import media from "styles/media";
// import colors from "styles/colors";
import text from "styles/text";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmailExists, setUserEmailExists] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const data = {
      firstName,
      lastName,
      email,
      password,
    };
    try {
      const res = await axios.post("/api/usersignup", data);
      console.log(res.data);
      return navigate('/login',{email, password})
    } catch (error) {
      if (error.response.status === 409) {
        setUserEmailExists(true);
      }
      console.error("Error during signup:", error.response.status);
    }
  };

  return (
    <Wrapper>
      <Form id="login-form">
        <FormHeader>Create Login</FormHeader>
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value.toLowerCase())}
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value.toLowerCase())}
        />
        <Email
          type="email"
          placeholder="Email"
          $iserror={userEmailExists}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={() => handleSubmit()}>
          Submit
        </button>
        {userEmailExists && (
          <EmailError>
            Email already in use. Try again or <a>login</a>.
          </EmailError>
        )}
      </Form>
    </Wrapper>
  );
};

export default Register;
const EmailError = styled.div`
  width: 100%;
  text-align: center;
`;

const Email = styled.input`
  border: ${(props) => (props.$iserror ? "2px solid red" : "unset")};
  color: ${(props) => (props.$iserror ? "red" : "unset")};
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
