import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import useLocalStorage from '../UseHooks/useLocalStorage'
import { Link} from 'react-router-dom';
function MovieTool({ id ,title }) {
    const storage = useLocalStorage();
    const handleEdit = () => {
        console.log('Edit movie');
        //handleClose();
      };
    
      const handleDelete = () => {
        console.log('Delete movie');
        //handleClose(); 
      };
  return (
    <div className='tools'>
    {storage?.value.email.includes('@staff') &&<div>
      <Tooltip title="Delete" arrow>
          <DeleteIcon onClick={handleDelete } className="icon" />
       </Tooltip>
      <Tooltip title="Edit" arrow>
     <Link to={`/movie/$${id}/{title}/Edit`}>  
       <EditIcon className="icon" />
    </Link>
    </Tooltip>
    </div>}
    </div>
  )
}

export default MovieTool