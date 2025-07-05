// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa';
import logo from '../../public/images/logo_bg.png'; // Adjust the path as necessary

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false); // Toggle search box

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm sticky-top">
      <div className="container">
        {/* Logo + Branding */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="SkillSync Logo" className="navbar-logo me-2" />
          <span className="logo-text">SkillSync</span>
        </Link>

        {/* Mobile toggle */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          {/* Left Nav */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>

            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown">Projects</Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/projects/browse">Browse Projects</Link></li>
                <li><Link className="dropdown-item" to="/projects/post">Post a Project</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown">Mentorship</Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/mentorship/book">Book a Mentor</Link></li>
                <li><Link className="dropdown-item" to="/mentorship/become">Become a Mentor</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown">User Dashboards</Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/learner">Learner Dashboard</Link></li>
                <li><Link className="dropdown-item" to="/contributor">Contributor Dashboard</Link></li>
                <li><Link className="dropdown-item" to="/mentor">Mentor Dashboard</Link></li>
                <li><Link className="dropdown-item" to="/admin">Admin Panel</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown">Resources</Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/blog">Blog / Articles</Link></li>
                <li><Link className="dropdown-item" to="/faq">FAQs</Link></li>
                <li><Link className="dropdown-item" to="/contact">Contact Us</Link></li>
              </ul>
            </li>
          </ul>

        </div>
      </div>
          <div className="collapse navbar-collapse justify-content-end" id="mainNavbar">
              <div className="d-flex align-items-center auth-buttons">
                {showSearch && (
                  <input
                    type="text"
                    placeholder="Type to search..."
                    className="form-control searchbox-input"
                    autoFocus
                  />
                )}
                <FaSearch
                  className="search-icon"
                  title="Search"
                  onClick={() => setShowSearch(!showSearch)}
                />
                <Link to="/login" className="btn btn-outline-custom ms-2">Login</Link>
                <Link to="/signup" className="btn btn-custom ms-2">Join Now</Link>
              </div>
            </div>



    </nav>
  );
};

export default Navbar;
