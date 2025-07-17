import React from "react";
import "./assets/styles.css"; 

const ProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>User Profile</h2>
        <div className="modal-form-item"><strong>Username:</strong> {user.username}</div>
        <div className="modal-form-item"><strong>Email:</strong> {user.email}</div>
        <div className="modal-form-item"><strong>Role:</strong> {user.role}</div>
        {/* You can add more user fields if needed */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProfileModal;
