import React from "react";
import "./Buttonstyles.css";

function CustomButton({ children, className, onClick }) {
  return (
    <button width="100%" className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default CustomButton;
