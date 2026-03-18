import React from "react";
import "./ProfilePage.css";
import ProfileInfo from "../features/Profile/ProfileInfo";
import ProfileLinks from "../features/Profile/ProfileLinks";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProfilePage() {
  const { userId: publicUserId } = useParams();
  const { currentUser } = useAuth();
  const resolvedUserId = publicUserId ?? currentUser?.uid ?? null;
  const isPublicPreview = Boolean(publicUserId);

  return (
    <div className={`profile-page ${isPublicPreview ? "shared-profile-page" : ""}`}>
      <div
        className={`profile-page-container ${
          isPublicPreview ? "shared-profile-card" : ""
        }`}
      >
        <ProfileInfo userId={resolvedUserId} />
        <ProfileLinks userId={resolvedUserId} />
      </div>
    </div>
  );
}

export default ProfilePage;
