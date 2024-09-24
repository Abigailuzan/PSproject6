import React, { useState } from 'react';
import '../Styles/MovieForm.css';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import useLocalStorage from "../UseHooks/useLocalStorage";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
function AddMovieForm({ onSubmit ,  categoryList, actorsList}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [length, setLength] = useState('');
  const [rating, setRating] = useState('');
  const [movieImageUrl, setMovieImageUrl] = useState('');
  const [movieVideoUrl, setMovieVideoUrl] = useState('');
  const [category, setCategory] = useState([]);
  const [actors, setActors] = useState([]);
  const storage = useLocalStorage();

  const handleSubmit = (e) => {
    e.preventDefault();

    const movieData = {
      title:title.toUpperCase(),
      description:description,
      release_year: releaseYear,
      length:length,
      rating:rating,
      last_update :  new Date().toISOString().split('T')[0],
      movie_image: movieImageUrl,
      movie_video: movieVideoUrl,
      category:category,
      actor:actors,
      verification_email:storage.value.email
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
            <option value="" disabled hidden>Select rating</option>
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
          </select>
        </div>
        <Autocomplete
            value={category || null}
            onChange={(e, newValue) => setCategory(newValue)}
            options={categoryList}
            getOptionLabel={(option) => option.name ? `${option.name}` :"category"}
            isOptionEqualToValue={(option, value) => option.name === value?.name}
            sx={{ width: 300 }}
            renderInput={(params) =>
                <TextField
                    {...params}
                    label="category"
                    placeholder="select category"
                    required
                    error={!category}
                    helperText={!category ? "select category" : ""}
                />
            }
        />

        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={actorsList}
            getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
            value={actors}
            onChange={(e, newValue) => setActors(newValue)}
            disableCloseOnSelect
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox icon= <CheckBoxOutlineBlankIcon fontSize="small" />
                  checkedIcon=<CheckBoxIcon fontSize="small" />
                  style={{ marginRight: 8 }}
                  checked={selected}
                  />
                  {`${option.first_name} ${option.last_name}`}
                </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label="Actors" placeholder="Select actors" />
            )}
        />
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
      </form>
    </div>
  );
}

export default AddMovieForm;
