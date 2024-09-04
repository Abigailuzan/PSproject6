import React from 'react';
import { Link } from 'react-router-dom';
import '../Stlyles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        <Link to="/about-us" className="footer-link">
          About Us
        </Link>
        <Link to="/contact-us" className="footer-link">
          Contact Us
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
