import { useState} from "react";
// import { Menu } from 'antd';
import {
  HomeTwoTone,
  EditTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useAuth } from "./AuthContext";

const Header = () => {
  const {isLoggedIn, handleContextLogout} = useAuth();
  const navigate = useNavigate();

  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    setCurrent(e.key);
  };
  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/logout", { withCredentials: true });
      if (res) {
       handleContextLogout()
       navigate('/login')
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
        <MenuItem key="h" icon={<HomeTwoTone />}>
          <Link to="/">Home</Link>
        </MenuItem>
       {!isLoggedIn && <MenuItem key="r" icon={<EditTwoTone />} style={{ marginLeft: "auto" }}>
          <Link to="/register">New User</Link>
        </MenuItem>}
        {!isLoggedIn && (
          <MenuItem key="l" icon={<CheckCircleTwoTone />}>
            <Link to="/login">Login</Link>
          </MenuItem>
        )}
        <MenuItem key="a" icon={<CheckCircleTwoTone />}>
          <Link to="/Anime">Anime</Link>
        </MenuItem>
        {isLoggedIn && (
          <MenuItem key="o" icon={<CheckCircleTwoTone />}>
            <Logout
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Logout>
          </MenuItem>
        )}
      </Menu>
      <Outlet />
    </>
  );
};

export default Header;

const Logout = styled(Link)`
  background-color: transparent;
`;
const MenuItem = styled.div`
  display: flex;
`;
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;
