import React from "react";
import { slide as Menu } from "react-burger-menu";
import { burgerStyle } from "../config";
import { Link } from "react-router-dom";
export default function Burger() {
  return (
    <Menu styles={burgerStyle}>
      <Link to="/" id="home" className="menu-item my-[20px]">
        <i className="fa-solid fa-house-user mx-[10px]"></i> Home
      </Link>

      <Link to="/watchList" id="about" className="menu-item my-[20px]">
        <i className="fa-sharp fa-solid fa-list mx-[10px]"></i> Watch-List
      </Link>

      <Link to="/history" id="contact" className="menu-item my-[20px]">
        <i className="fa-solid fa-clock-rotate-left mx-[10px]"></i> History
      </Link>

      <Link to="/liked-vidoes" className="menu-item--small my-[20px]">
        <i className="fa-regular fa-thumbs-up mx-[10px]"></i> Liked Videos
      </Link>
    </Menu>
  );
}
