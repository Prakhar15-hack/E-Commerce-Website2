// components/Header.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux store se user ki info nikal rahe hain
  const { userInfo } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="nav-container">
        <Link to="/" className="brand">
          ASSEMBLE
        </Link>
        <nav className="nav-links">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i> Cart
          </Link>
          {userInfo ? (
            // Agar user login hai, toh uska naam aur logout button dikhao
            <div className="dropdown">
              <button className="dropbtn">{userInfo.name} <i className="fa fa-caret-down"></i></button>
              <div className="dropdown-content">
                <Link to="/profile">Profile</Link>
                <button onClick={logoutHandler} className="logout-button">Logout</button>
              </div>
            </div>
          ) : (
            // Agar user login nahi hai, toh Sign In link dikhao
            <Link to="/login">
              <i className="fas fa-user"></i> Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
