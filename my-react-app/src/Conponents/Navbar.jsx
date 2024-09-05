import React from 'react'
import NavbarLeft from './NavbarLeft'
import NavbarRight from './NavbarRight'
function Navbar() {
  return (
    <div>
    <nav className="nav">
   <NavbarLeft/>
   <NavbarRight/>
   </nav>
</div>
  )
}

export default Navbar
