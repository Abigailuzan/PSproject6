import React, { useEffect, useState } from 'react';
import '../Styles/MovieForm.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useLocalStorage from "../UseHooks/useLocalStorage";
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
//const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
//const checkedIcon = <CheckBoxIcon fontSize="small" />;
function EditMovieForm({ movie, onSubmit, categoryList, actorsList }) {
    console.log(movie);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseYear, setReleaseYear] = useState(0);
    const [length, setLength] = useState(0);
    const [rating, setRating] = useState('');
    const [movieImageUrl, setMovieImageUrl] = useState('');
    const [movieVideoUrl, setMovieVideoUrl] = useState('');
    const [category, setCategory] = useState([]);
    const [actors, setActors] = useState([]);
    const storage = useLocalStorage();

    useEffect(() => {
        if (movie) {
            setTitle(movie.title);
            setDescription(movie.description);
            setReleaseYear(movie.release_year || 0);
            setLength(movie.length || 0);
            setRating(movie.rating || '');
            setMovieImageUrl(movie.movie_image || '');
            setMovieVideoUrl(movie.movie_video || '');
            if (Array.isArray(movie.actors_list)) {
                const selectedActors = movie.actors_list.map(actor =>
                    actorsList.find(item =>
                        item.first_name === actor.first_name && item.last_name === actor.last_name
                    )
                ).filter(Boolean);
                setActors(selectedActors);
            }
            const selectedCategory = categoryList.find(cat => cat.name === movie.category_name);
            setCategory(selectedCategory || null);
        }
    }, [movie, actorsList, categoryList]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const movieData = {
            title: title,
            description: description,
            release_year: releaseYear,
            length: length,
            rating: rating,
            last_update: new Date().toISOString().split('T')[0],
            movie_image: movieImageUrl,
            movie_video: movieVideoUrl,
            category: category,
            actors: actors,
            verification_email: storage.value.email,
        };
        console.log(movieData)
        onSubmit(movieData, movie.film_id);
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

                {/* Autocomplete for Category */}
                <Autocomplete
                    value={category}
                    onChange={(e, newValue) => setCategory(newValue)}
                    options={categoryList}
                    getOptionLabel={(option) => `${option.name}`}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Category" />}
                />

                {/* Autocomplete for Actors with Checkboxes */}
                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={actorsList}
                    getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                    value={actors} // וודא שזה מכיל את השחקנים שכבר נבחרו
                    onChange={(e, newValue) => setActors(newValue)} // מעדכן את הרשימה בהתאם לבחירה
                    disableCloseOnSelect
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox
                                icon= <CheckBoxOutlineBlankIcon fontSize="small" />
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
                <button type="submit" className="submit-button">Update Movie</button>
            </form>
        </div>
    );
}

export default EditMovieForm;
