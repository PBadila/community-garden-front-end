/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "../Navbar.css";
function NavBar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <nav className="nav sticky">
      <a href="#" className="nav__brand">
        we can put the logo here<img src="./" alt="" />
      </a>
      <ul className={active}>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Home
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            About
          </a>
        </li>
        {/* <li className="nav__item">
          <a href="#" className="nav__link">
           
          </a>
        </li> */}
        <li className="nav__item">
          <a href="#" className="nav__link">
            Sign Up
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Log In
          </a>
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}
export default NavBar; 