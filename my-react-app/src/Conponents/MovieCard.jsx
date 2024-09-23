import React ,{useState}from 'react';
import '../Styles/MovieCard.css';
import {  useNavigate} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
const MovieCard = ({ film_id,title, type, season, episode, movie_image ,storage}) => {
  // const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick=()=>{
    if (storage.value){
      if(!storage.value.email.includes('staff')){
        const historyMovie = {
          customer_id: storage.value.id,
          film_id:film_id,
          last_update :  new Date().toISOString().split('T')[0],
        }
        axios.post(`http://localhost:5000/history`,historyMovie)
            .then(response => {
              console.log("response data: ", response.data);
              //setMovies(response.data.movies);
              //setTotalMovies(response.data.total);
            })
            .catch(error => {
              console.error(error);
            });
      }
      navigate( `/movie/${film_id}/${title}`);
    }
    else{
      navigate( '/sign-in');
    }
  }

  return (
    <div className="movie-card">
    <div onClick={handleClick}>
      <img className="movie-image" src={movie_image} alt={title} />
      <div className="card-details">
        <h3 className="card-title">{title}</h3>
        {/* <p className="card-info">{type} {season && `S${season}`} {episode && `E${episode}`}</p> */}
      </div>
  </div>
    </div>
  );
};

export default MovieCard;
