import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';


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