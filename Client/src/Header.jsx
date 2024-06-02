
import { useState}  from 'react';
import { Menu } from 'antd';
import { HomeTwoTone, EditTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { Outlet, Link } from 'react-router-dom';

const Header = ()=>{
   
 
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
      setCurrent(e.key);
      console.log(current)
    };
    
    return (
        <>
         <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" >
          <Menu.Item key="h" icon= {<HomeTwoTone />}>
           <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="r" icon= {<EditTwoTone />} style={{marginLeft:'auto'}}>
            <Link to="/register">Register</Link>
          </Menu.Item>
          <Menu.Item key="l" icon= {<CheckCircleTwoTone />}>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="a" icon= {<CheckCircleTwoTone />}>
            <Link to="/Anime">Anime</Link>
          </Menu.Item>
         </Menu>
         <Outlet/>
        </>
       
      )
}

export default Header;