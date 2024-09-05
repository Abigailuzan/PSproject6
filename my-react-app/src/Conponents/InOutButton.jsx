
import React from 'react'
import { Link } from 'react-router-dom';
import '../Stlyles/Navbar.css';
function InOutButton() {
  return (
    <div>
    <Link to="/sign-in">
    <botton className="sign-in-button">Sign In</botton>
    </Link>
    </div>
  )
}

export default InOutButton