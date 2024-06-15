import { useRef } from "react";
import {
  CheckCircleTwoTone,
  EditTwoTone,
  HomeTwoTone,
} from "@ant-design/icons";
import colors from "styles/colors";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import text from "styles/text";
import { useAuth } from "../../AuthContext";
import { logout } from "../../API/UserLoginHandler";
import media from "styles/media";

const Header = () => {
  const { isLoggedIn, handleContextLogout } = useAuth();
  const navigate = useNavigate();
  const headerRef = useRef();

  const handleLogout = async () => {
    logout(handleContextLogout, navigate);
  };

  useGSAP(
    () => {
      const hoverables = gsap.utils.toArray(".menu-item");
      gsap.config({
        nullTargetWarn: false,
      });
      const playTimeline = (hover) => {
        const hoverTL = gsap
          .timeline({ paused: true })
          .fromTo(
            hover.querySelector(".border-grow"),
            {
              width: "0%",
            },
            {
              width: "100%",
              ease: "back.out",
            }
          )
          .to(
            hover.querySelector("a"),
            {
              scale: 1.2,
              ease: "expoScale.out",
            },
            0
          );
        return hoverTL;
      };

      hoverables.forEach((hover) => {
        const timeline = playTimeline(hover);
        hover.addEventListener("mouseover", () => timeline.play());
        hover.addEventListener("mouseout", () => timeline.reverse());
      });
    },
    { scope: headerRef, dependencies: [isLoggedIn], revertOnUpdate: false }
  );

  return (
    <>
      <Menu ref={headerRef}>
        <MenuItem
          className="menu-item"
          style={{ marginRight: "auto" }}
          icon={<HomeTwoTone />}
        >
          <Link to="/">Pixel Pushers</Link>
          <Border className="border-grow" />
        </MenuItem>
        {isLoggedIn && (
          <MenuItem className="menu-item">
            <Link to="/profile">Profile</Link>
            <Border className="border-grow" />
          </MenuItem>
        )}
        {!isLoggedIn && (
          <MenuItem className="menu-item" icon={<EditTwoTone />}>
            <Link to="/register">New User</Link>
            <Border className="border-grow" />
          </MenuItem>
        )}
        {!isLoggedIn && (
          <MenuItem className="menu-item" icon={<CheckCircleTwoTone />}>
            <Link to="/login">Login</Link>
            <Border className="border-grow" />
          </MenuItem>
        )}
        <MenuItem className="menu-item" icon={<CheckCircleTwoTone />}>
          <Link to="/Anime">Anime</Link>
          <Border className="border-grow" />
        </MenuItem>
        {isLoggedIn && (
          <MenuItem className="menu-item" icon={<CheckCircleTwoTone />}>
            <Logout onClick={handleLogout}>Logout</Logout>
            <Border className="border-grow" />
          </MenuItem>
        )}
      </Menu>
      <Outlet />
    </>
  );
};

export default Header;
const Border = styled.div`
  background-color: ${colors.navGreen};
  width: 0vw;
  border-radius: 3.472vw;
  height: 0.174vw;

  ${media.fullWidth} {
    width: 0px;
    border-radius: 50px;
    height: 2.5px;
  }

  ${media.tablet} {
    width: 0vw;
    border-radius: 4.883vw;
    height: 0.244vw;
  }

  ${media.mobile} {
    width: 0vw;
    border-radius: 11.682vw;
    height: 0.584vw;
  }
`;
const Logout = styled(Link)`
  background-color: transparent;
`;
const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: auto;
  a {
    color: white;
    ${text.bodyMBoldChillax}
    ${media.fullWidth} {
    }

    ${media.tablet} {
      ${text.bodyMChillax}
    }

    ${media.mobile} {
      ${text.bodyM}
    }
  }
`;
const Menu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #412485;
  z-index: 3;
  gap: 1.736vw;
  height: 2.431vw;
  padding: 0vw 3.472vw;

  ${media.fullWidth} {
    gap: 25px;
    height: 35px;
    padding: 0px 50px;
  }

  ${media.tablet} {
    gap: 2.441vw;
    height: 3.418vw;
    padding: 2vw 4.441vw;
  }

  ${media.mobile} {
    gap: 5.841vw;
    height: 8.178vw;
    padding: 5vw 5.841vw;
  }
`;
