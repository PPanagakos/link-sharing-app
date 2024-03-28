import React from "react";
import "../styles/LinksFooter.css";

function LinksFooter({ onSave, links }) {
  return (
    <div className="footer-container">
      <div className="border-bottom"></div>
      <div className="flex-end auto-margin-right">
        <button
          disabled={!links.length}
          onClick={onSave}
          className="secondaryButton fontSemiBold save-button"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default LinksFooter;
