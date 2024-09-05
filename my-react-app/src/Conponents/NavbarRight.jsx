import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import '../Stlyles/Navbar.css';


function HomeNavbar() {
  return (
      <div className="nav-actions">
        <Link to="/home" className="home-link">
          <HomeIcon fontSize="large" className="home-icon" />
        </Link>
        <Link to="/sign-in" className="sign-in-link">
          <button className="sign-in-button">
            Sign In
          </button>
        </Link>
      </div>
  )
}

export default HomeNavbar