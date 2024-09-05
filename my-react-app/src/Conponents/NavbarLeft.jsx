import React from 'react';
import '../Stlyles/Navbar.css';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  return (
        <div className="nav-left">
        <div className="logo">movieWatch</div> 
        <Link to="/user-info" className="user-info">
          <div className="user-info">
            <AccountCircleIcon fontSize="large" className="user-icon" />
            <h3 className="username">userName</h3>
          </div>
        </Link>
      </div>  
  );
};

export default Navbar;
