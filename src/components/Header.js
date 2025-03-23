import React from "react";
import logo from "../assets/vaporlogo.svg";
import Button from "./Button";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={logo} alt="" />
          vapor ui
        </div>
        <div className="rheader">
          <Button />
        </div>
      </div>
    </>
  );
};

export default Header;
