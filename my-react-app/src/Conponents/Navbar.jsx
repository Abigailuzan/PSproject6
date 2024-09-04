import React from 'react';
import '../Stlyles/Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="logo">movieWatch</div>
      <div className="search-bar">
        <input className="search-input" placeholder="Search..." />
        <button className="search-button">
          <SearchIcon />
        </button>
      </div>
      <Link to="/sign-in">
      <Button variant="contained" color="success">Sign In</Button>
      </Link>
    </nav>
  );
};

export default Navbar;
