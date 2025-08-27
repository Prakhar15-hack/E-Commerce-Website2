// screens/ProfileScreen.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      const getUserDetails = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          const { data } = await axios.get('http://localhost:5000/api/users/profile', config);
          setName(data.name);
          setEmail(data.email);
          setLoading(false);
        } catch (err) {
          setError(err.response.data.message || err.message);
          setLoading(false);
        }
      };
      getUserDetails();
    }
  }, [navigate, userInfo]);

  return (
    <div className="profile-container">
      <div className="profile-form">
        <h2>User Profile</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={name} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" value={email} readOnly />
            </div>
          </form>
        )}
      </div>
      <div className="profile-orders">
        <h2>My Orders</h2>
        <p>You have no orders.</p>
      </div>
    </div>
  );
};

export default ProfileScreen;
