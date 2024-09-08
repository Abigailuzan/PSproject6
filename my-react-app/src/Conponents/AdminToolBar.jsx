import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import '../Stlyles/Navbar.css';
import React from 'react'

function AdminToolBar() {
  return (
    <div>
       <Tooltip title="Add movie" arrow>
        <Link to="/add-movie" className="home-link">
          <AddIcon fontSize="large" className="icon" />
        </Link>
      </Tooltip>
      <Tooltip title="Add admin" arrow>
         <Link to="/add-admin" className="home-link">
          <PersonAddIcon fontSize="large" className="icon" />
        </Link>    
       </Tooltip>
    </div>
  )
}

export default AdminToolBar