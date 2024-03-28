import React from "react";
import "../Links/styles/LinksFooter.css";
import CustomButton from "../../components/Button/CustomButton";

function ProfileDetailsFooter({ onSave }) {
  return (
    <div className="footer-container">
      <div className="border-bottom"></div>
      <div className="flex-end auto-margin-right">
        <CustomButton
          onClick={onSave}
          className="secondaryButton fontSemiBold save-button"
        >
          Save
        </CustomButton>
      </div>
    </div>
  );
}

export default ProfileDetailsFooter;
