import React from "react";
import "./Buttonstyles.css";

function CustomButton({
  children,
  className,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      width="100%"
      className={`${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default CustomButton;
