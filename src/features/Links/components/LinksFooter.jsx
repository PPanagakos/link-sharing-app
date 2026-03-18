import React from "react";
import "../styles/LinksFooter.css";

function LinksFooter({ onSave, links, hasUnsavedChanges }) {
  return (
    <div className="footer-container">
      <div className="border-bottom"></div>
      <div className="flex-end auto-margin-right">
        <button
          disabled={!hasUnsavedChanges}
          onClick={onSave}
          className="secondaryButton fontSemiBold save-button"
        >
          {links.length ? "Save" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

export default LinksFooter;
