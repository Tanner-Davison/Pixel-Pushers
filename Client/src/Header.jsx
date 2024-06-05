import { useState, useRef } from "react";
import {
  HomeTwoTone,
  EditTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useAuth } from "./AuthContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import text from "styles/text";

const Header = () => {
  const { isLoggedIn, handleContextLogout } = useAuth();
  const navigate = useNavigate();
  const headerRef = useRef();
  const [current, setCurrent] = useState("mail");

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/logout", { withCredentials: true });
      if (res) {
        handleContextLogout();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useGSAP(() => {
    const hoverables = gsap.utils.toArray(".menu-item");
    gsap.config({
      nullTargetWarn: false,
    });
    const playTimeline = (hover) => {
      const hoverTL = gsap
        .timeline({ paused: true })
        .to(hover.querySelector(".border-grow"), {
          width: "100%",
          ease: "back.out",
        })
        .to(
          hover.querySelector("a"),
          {
            scale: 1.2,
            ease: "linear",
            duration:.2
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
  },{scope:headerRef,dependencies:[isLoggedIn]});

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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  height: 35px;
  background-color: #412485;
`;
