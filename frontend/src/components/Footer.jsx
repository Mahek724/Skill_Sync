// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Footer.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
   <footer className="skill-footer">
  <div className="footer-container container">
    <div className="footer-left">
      <ul className="footer-links list-unstyled">
        <li><Link to="/" className="footer-link">Home</Link></li>
        <li><Link to="/about" className="footer-link">About</Link></li>
        <li><Link to="/contact" className="footer-link">Contact</Link></li>
        <li><a href="https://github.com/your-github" className="footer-link" target="_blank" rel="noreferrer">GitHub</a></li>
      </ul>
    </div>

    <div className="footer-center">
      &copy; {new Date().getFullYear()} SkillSync. All rights reserved.
    </div>

    <div className="footer-right footer-icons">
      <a href="https://github.com/your-github" target="_blank" rel="noreferrer"><FaGithub /></a>
      <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noreferrer"><FaLinkedin /></a>
      <a href="mailto:youremail@example.com"><FaEnvelope /></a>
    </div>
  </div>
</footer>

  );
};

export default Footer;
