import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useravatar from './useravatar.png';
import './assets/styles.css';
import ProfileModal from './ProfileModal'; // ✅ Import the profile modal

export function ProfileDropdown({ username }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('User successfully logged out');
        navigate('/');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleOrdersClick = () => {
    navigate('/orders');
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:9090/api/users/profile", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      setUser(data);
      setShowProfileModal(true);
      setIsOpen(false); // Close dropdown when modal opens
    } catch (err) {
      alert("Error fetching profile");
      console.error(err);
    }
  };

  return (
    <div className="profile-dropdown">
      <button className="profile-button" onClick={toggleDropdown}>
        <img
          src={useravatar}
          alt="User Avatar"
          className="user-avatar"
          onError={(e) => { e.target.src = 'fallback-logo.png'; }}
        />
        <span className="username">{username || 'Guest'}</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <a onClick={fetchProfile}>Profile</a> {/* ✅ Profile fetch */}
          <a onClick={handleOrdersClick}>Orders</a>
          <button className="profile-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {/* ✅ Show profile modal */}
      {showProfileModal && (
        <ProfileModal
          user={user}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
}

