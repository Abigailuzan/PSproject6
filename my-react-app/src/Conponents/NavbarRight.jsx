import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import '../Stlyles/Navbar.css';
import InOutButton from './InOutButton';
import Tooltip from '@mui/material/Tooltip';


function NavbarRight({name,logOut }) {
  return (
      <div className="nav-actions">
        <Tooltip title="Home" arrow>
        <Link to="/home" className="home-link">
          <HomeIcon fontSize="large" className="icon" />
        </Link>
        </Tooltip>
       <InOutButton name={name} logOut={logOut} />
      </div>
  )
}

export default NavbarRight