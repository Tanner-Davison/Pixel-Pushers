import { useRef } from "react";
import {
  CheckCircleTwoTone,
  EditTwoTone,
  HomeTwoTone,
} from "@ant-design/icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import text from "styles/text";
import { useAuth } from "../../AuthContext";
import { logout } from "../../API/UserLoginHandler";

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
              ease: "back.out",
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
          <Link to="/">Home</Link>
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
  background-color: #05f769;
  width: 0px;
  border-radius: 50px;
  height: 2.5px;
`;
const Logout = styled(Link)`
  background-color: transparent;
`;
const MenuItem = styled.div`
  cursor: pointer;
  a {
    color: white;
    ${text.bodyMBoldChillax}
  }
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100px;
`;
const Menu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  height: 35px;
  padding: 0px 25px;
  background-color: #412485;
  overflow: hidden;
  z-index: 3;
`;
