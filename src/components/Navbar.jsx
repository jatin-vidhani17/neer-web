import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Make sure to adjust your CSS accordingly

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo-container">
        <img src="assets/images/logo.png" alt="Logo" className="logo" />

        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/citizen-science">Citizen Science</Link></li>
          <li><Link to="/observations">Observations</Link></li>
          <li><Link to="/publications">Publications</Link></li>
          <li><Link to="/app">App</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
          <li><Link to="/volunteer-yourself">Volunteer Yourself</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
