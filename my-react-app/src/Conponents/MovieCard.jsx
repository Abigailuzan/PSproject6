import React from 'react';
import '../Stlyles/MovieCard.css';

const MovieCard = ({ title, type, season, episode, image }) => {
  return (
    <div className="movie-card">
      <img className="movie-image" src={image} alt={title} />
      <div className="card-details">
        <h3 className="card-title">{title}</h3>
        {/* <p className="card-info">{type} {season && `S${season}`} {episode && `E${episode}`}</p> */}
      </div>
    </div>
  );
};

export default MovieCard;
