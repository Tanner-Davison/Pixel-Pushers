import { useState } from "react";
import styled from "styled-components";
import media from "styles/media";
// import colors from "styles/colors";
import { useNavigate } from "react-router-dom";
import text from "styles/text";
import { passwordStrength } from "../../HelperFunctions/PasswordHandler";
import { createUser } from "../../API/CreateUser";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmailExists, setUserEmailExists] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isStrong, setIsStrong] = useState(null);
  const [passwordFill, setPasswordFill] = useState("black");

  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!isStrong) return;
    const data = {
      firstName,
      lastName,
      email,
      password,
    };
    return createUser(data, navigate, email, password, setUserEmailExists);
  };

  return (
    <Wrapper>
      <Form id="login-form" $iserror={userEmailExists}>
        <FormHeader>Create Login</FormHeader>
        <FirstName
          type="text"
          placeholder="First Name"
          $firstname={firstName === ""}
          onChange={(e) => setFirstName(e.target.value.toLowerCase())}
        />
        <LastName
          type="text"
          placeholder="Last Name"
          $lastname={lastName}
          onChange={(e) => setLastName(e.target.value.toLowerCase())}
        />

        <Email
          type="email"
          placeholder="Email"
          $iserror={userEmailExists}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          onFocus={() => setUserEmailExists(false)}
        />
        <PasswordWrapper>
          <Password
            type="text"
            $isstrong={isStrong}
            $error={passwordError}
            onFocus={() => setPasswordError(false)}
            placeholder="password"
            onChange={(e) =>
              passwordStrength(
                e,
                password,
                setPasswordFill,
                setIsStrong,
                setPassword
              )
            }
          />
          {password.length > 4 && (
            <StatusSymbol $isstrong={isStrong}>
              <SVG
                viewBox="0 0 10 10"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "10px", height: "10px" }}
              >
                <circle cx="5" cy="5" r="3" fill={passwordFill} />
              </SVG>
              <Status $passwordstrong={isStrong}>
                {isStrong === null ? "" : isStrong ? "Strong" : "Weak"}
              </Status>
            </StatusSymbol>
          )}
        </PasswordWrapper>
        <button type="button" onClick={() => onSubmit()}>
          Submit
        </button>
        {userEmailExists && (
          <EmailError>
            Email in use. Try again{" "}
            <LoginLink href="/login">
              Go To Login<Arrow>→</Arrow>
            </LoginLink>
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
const Arrow = styled.span`
  font-size: 1.2em;
  margin-left: 5px;
`;
const LoginLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsla(150, 52%, 51%, 1);
`;
const SVG = styled.svg``;
const Status = styled.p`
  ${text.bodySChillax}
  color: ${(props) =>
    props.$passwordstrong
      ? "hsla(135, 50%, 50%, 1)"
      : "hsla(350, 50%, 60%, 1)"};
`;
const StatusSymbol = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 5px;
  left: 99%;
  text-wrap: nowrap;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.5vw 0.694vw;
  border-radius: 10px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-left: none;
  ${media.fullWidth} {
    padding: 5px 10px;
  }

  ${media.tablet} {
    padding: 0.488vw 0.977vw;
  }

  ${media.mobile} {
    position: relative;
    padding: 1.168vw 2.336vw;
    left: unset;
    border-top-left-radius: 15px;
    border-bottom-left-radius: unset;
  }
`;
const Password = styled.input`
  color: ${(props) =>
    props.$isstrong === null
      ? "white"
      : props.$isstrong
      ? "hsla(135, 50%, 50%, 1)"
      : "hsla(350, 50%, 60%, 1)"};

  border: ${(props) =>
    props.$error ? "1px solid hsla(350, 50%, 60%, 1)" : "none"};
`;

const FirstName = styled.input``;

const LastName = styled.input``;
const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  ${media.fullWidth} {
  }

  ${media.tablet} {
  }

  ${media.mobile} {
    flex-direction: column;
    gap: 2.336vw;
  }
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
  border-radius: 2.083vw;
  -webkit-box-shadow: 0px 0px 9px -3px #ffffff;
  box-shadow: 0px 0px 9px -3px #ffffff;
  ${media.fullWidth} {
    margin: 53px;
    border-radius: 30px;
  }

  ${media.tablet} {
    margin: 9.766vw;
    padding: 10.883vw;
    border-radius: 2.93vw;
    gap: 2.577vw;
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
  height:80vh;
`;
