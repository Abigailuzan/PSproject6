import React ,{useState}from 'react';
import '../Stlyles/MovieCard.css';
import {  useNavigate} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const MovieCard = ({ id,title, type, season, episode, image ,storage}) => {
  // const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  console.log(storage.admin);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };


  const handleClick=()=>{
    if (storage.value){
      navigate( `/movie/${id}/${ title}`);
    }
    else{
      navigate( '/sign-in');
    }

  }

  return (
    <div className="movie-card">
    <div onClick={handleClick}>
      <img className="movie-image" src={image} alt={title} />
      <div className="card-details">
        <h3 className="card-title">{title}</h3>
        {/* <p className="card-info">{type} {season && `S${season}`} {episode && `E${episode}`}</p> */}
      </div>
  </div>
    </div>
  );
};

export default MovieCard;
