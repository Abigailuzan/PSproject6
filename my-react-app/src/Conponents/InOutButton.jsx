
import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';
// import LogoutIcon from '@mui/icons-material/Logout';
// import LoginIcon from '@mui/icons-material/Login';

function InOutButton({name,logOut}) {
  return (
    <div>
    {name? 
    <button className="sign-in-button" onClick={()=>{logOut()}}>Log out</button>:
    <Link to="/sign-in">  
    <button className="sign-in-button">Sign In</button>
    </Link>}
    </div>
  )
}

export default InOutButton