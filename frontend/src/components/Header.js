// components/Header.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  // Redux store se cart ki info nikal rahe hain
  const { cartItems } = useSelector((state) => state.cart);

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
        
        <SearchBox />

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <a href="#contact-section">Contact Us</a> 

          <Link to="/cart" className="cart-link"> {/* Cart link ko ek class di */}
            <i className="fas fa-shopping-cart"></i> Cart
            {/* Agar cart mein items hain, toh unka count dikhao */}
            {cartItems.length > 0 && (
              <span className="cart-badge">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
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
