import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          PasteBin Clone
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/create" className="nav-link">
            Create Paste
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;