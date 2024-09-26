import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from './asets/Tentkotta-Photoroom.png-Photoroom.png'; // Make sure to replace with the correct path to your logo

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Tentkotta Logo" className="navbar-logo" />
        <span className="navbar-title">Tentkotta</span>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/join" className="nav-item">Join</Link>
        <Link to="/login" className="nav-item">Login</Link>
        <Link to="/works" className="nav-item">Works</Link>
        <Link to="/office-bearers" className="nav-item">Office Bearers</Link>
        <Link to="/about" className="nav-item">About</Link>
        <Link to="/contact" className="nav-item">Contact</Link>
      </div>
    </nav>
  );
}

export default NavBar;
