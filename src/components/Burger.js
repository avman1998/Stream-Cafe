import React from "react";
import { slide as Menu } from "react-burger-menu";
import { burgerStyle } from "../config";
export default function Burger() {
  return (
    <Menu styles={burgerStyle}>
      <a id="home" className="menu-item my-[20px]" href="/">
        <i className="fa-solid fa-house-user mx-[10px]"></i> Home
      </a>
      <a id="about" className="menu-item my-[20px]" href="/about">
        <i className="fa-sharp fa-solid fa-list mx-[10px]"></i> Playlists
      </a>
      <a id="contact" className="menu-item my-[20px]" href="/contact">
        <i className="fa-solid fa-clock-rotate-left mx-[10px]"></i> History
      </a>
      <a className="menu-item--small my-[20px]" href="">
        <i className="fa-regular fa-thumbs-up mx-[10px]"></i> Liked Videos
      </a>
    </Menu>
  );
}
