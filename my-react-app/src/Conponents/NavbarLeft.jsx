import React from 'react';
import '../Styles/Navbar.css';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavbarLeft = ({name}) => {
  return (
        <div className="nav-left">
        <div className="logo">movieWatch</div> 
        {name && <Link to="/user-info" className="user-info">
          <div className="user-info">
            <AccountCircleIcon fontSize="large" className="user-icon" />
            <h3 className="username">{name}</h3>
          </div>
        </Link>}
      </div>  
  );
};

export default NavbarLeft;
