import React from 'react'
import '../Stlyles/MovieInfo.css';
import MovieTool from './MovieTool';

function MovieInfo( { movie } ) {

    // פונקציה להמרת קישור YouTube רגיל לקישור להטמעה
    const getEmbedUrl = (url) => {
        if (!url) return ''; // במקרה שאין קישור
        // בדוק אם הקישור הוא מ-YouTube והמר אותו לקישור להטמעה
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(youtubeRegex);
        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }
        return url; // אם זה לא קישור YouTube, השתמש בקישור הקיים
    };

    return (
        <div>
            <iframe className="video-container"
                    width="900"
                    height="600"
                    src={getEmbedUrl(movie.movie_video)}
                    title={movie.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
            ></iframe>
            <MovieTool id={movie.film_id} title={movie.title} />
            <div className="description-container">
                <h2 className='h2-description'>Description:</h2>
                <p className="movie-description">{movie.description}</p>
            </div>
        </div>)
}

export default MovieInfo;
