// components/Header.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import SearchBox from './SearchBox'; // SearchBox ko import kiya

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        
        <SearchBox /> {/* SearchBox ko yahaan add kiya */}

        <nav className="nav-links">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i> Cart
          </Link>
          {userInfo ? (
            <div className="dropdown">
              <button className="dropbtn">{userInfo.name} <i className="fa fa-caret-down"></i></button>
              <div className="dropdown-content">
                <Link to="/profile">Profile</Link>
                <button onClick={logoutHandler} className="logout-button">Logout</button>
              </div>
            </div>
          ) : (
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
