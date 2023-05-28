import React, { useContext, useEffect } from "react";
import { Button, Dropdown } from "antd"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Logo from "../../img/vq9_blog_header.png";
import './navbar.scss'

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const items = [
    {
      label: <Link className="profile" to="/profile">Profile</Link>,
      key: '0',
    },
    {
      label: <Link className="write" to="/write">Write</Link>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <span onClick={logout}>Logout</span>,
      key: '3',
    },
  ];

  const toggleShowDropdown = () => {
    setShow(!show);
  }

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/posts/category?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/posts/category/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/posts/category/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/posts/category/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/posts/category/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/posts/category/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <div className="user-infor">
            {currentUser ? (
              <Dropdown
                menu={{
                  items,
                }}
                trigger={['click']}
              >
                <button onClick={toggleShowDropdown} className="btn" id="btn">
                  <h3>{currentUser?.username}</h3>
                  <i className="bx bx-chevron-down" id="arrow"></i>
                </button>
              </Dropdown>
            ) : (
              <button onClick={() => navigate('/login')}>Login</button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
