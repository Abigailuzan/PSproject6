import React , { useState }  from 'react'
import '../Stlyles/MovieForm.css'; 
function EditMovieForm({movie,onSubmit}) {
    const [title, setTitle] = useState(movie.title);
    const [description, setDescription] = useState(movie.description);
    const [releaseYear, setReleaseYear] = useState(movie.release_year);
    const [length, setLength] = useState(movie.length);
    const [rating, setRating] = useState(movie.rating);
    const [movieImageUrl, setMovieImageUrl] = useState(movie.movie_image);
    const [movieVideoUrl, setMovieVideoUrl] = useState(movie.movie_video);
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const movieData = {
        title:title,
        description:description,
        release_year: releaseYear,
        length:length,
        rating:rating,
        last_update : new Date(),
        movie_image: movieImageUrl,
        movie_video: movieVideoUrl,
      };
  
      onSubmit(movieData);
    };
  
  return (
    <div className="form-container">
     <form onSubmit={handleSubmit} className="movie-form">
    <div className="form-group">
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <label>Release Year</label>
      <input
        type="number"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <label>Length (minutes)</label>
      <input
        type="number"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        required
      />
    </div>
    <div className="form-group">
      <label>Rating</label>
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      >
        <option value="G">G</option>
        <option value="PG">PG</option>
        <option value="PG-13">PG-13</option>
        <option value="R">R</option>
      </select>
    </div>
    <div className="form-group">
      <label>Movie Image URL</label>
      <input
        type="url"
        value={movieImageUrl}
        onChange={(e) => setMovieImageUrl(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label>Movie Video URL</label>
      <input
        type="url"
        value={movieVideoUrl}
        onChange={(e) => setMovieVideoUrl(e.target.value)}
        required
      />
    </div>
    <button type="submit" className="submit-button">Add Movie</button>
  </form></div>
  )
}

export default EditMovieForm