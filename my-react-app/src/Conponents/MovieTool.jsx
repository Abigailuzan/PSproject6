import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import useLocalStorage from '../UseHooks/useLocalStorage'
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
function MovieTool({ id ,title }) {
    const storage = useLocalStorage();
    const navigate = useNavigate();
    console.log(id,title)
    
      const handleDelete = () => {
          axios.delete(`http://localhost:5000/movies/${id}/${storage.value.email}`)
              .then(response => {
                  alert(`movie ${title} was deleted successfully`)
                  console.log('Delete movie');
                  navigate('/home')
              })
              .catch(error => {
                  console.error('There was an error deleting the movie', error);
              });
      };
  return (
    <div className='tools'>
    {storage?.value.email.includes('staff') &&<div>
      <Tooltip title="Delete" arrow>
          <DeleteIcon onClick={handleDelete } className="icon" />
       </Tooltip>
      <Tooltip title="Edit" arrow>
     <Link to={`/movie/${id}/${title}/Edit`}>
       <EditIcon className="icon" />
    </Link>
    </Tooltip>
    </div>}
    </div>
  )
}

export default MovieTool