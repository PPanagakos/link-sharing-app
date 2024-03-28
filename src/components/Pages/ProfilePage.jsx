import React from "react";
import "./ProfilePage.css";
import ProfileInfo from "../features/Profile/ProfileInfo";
import ProfileLinks from "../features/Profile/ProfileLinks";

function ProfilePage() {
  return (
    <div className="profile-page">
      <div className="profile-page-container">
        <ProfileInfo />
        <ProfileLinks />
      </div>
    </div>
  );
}

export default ProfilePage;
