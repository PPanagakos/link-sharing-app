import React from "react";
import "../App.css";
import Navbar from "../components/Navbar/Navbar";

export const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);
