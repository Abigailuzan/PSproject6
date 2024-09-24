import React from 'react'
import '../Styles/MovieInfo.css';
import MovieTool from './MovieTool';

function MovieInfo( { movie } ) {
    console.log(movie)
    const getEmbedUrl = (url) => {
        if (!url) return '';
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(youtubeRegex);
        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }
        return url;
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
            <MovieTool id={movie.film_id} title={movie.title}/>
            <div className="description-container">
                <h2 className="h2-description">Description: </h2>
                <p className="movie-description">{movie.description}</p>
            </div>
            <div className="description-container">
                <h2 className='h2-description'>Length:</h2>
                <p className="movie-description">{movie.length}</p>
            </div>
            <div className="description-container">
                <h2 className='h2-description'>Release year:</h2>
                <p className="movie-description">{movie.release_year}</p>
            </div>
            <div className="description-container">
                <h2 className='h2-description'>Rating:</h2>
                <p className="movie-description">{movie.rating}</p>
            </div>
            <div className="description-container">
                <h2 className='h2-description'>Category:</h2>
                <p className="movie-description">{movie.category_name}</p>
            </div>
            <div className="description-container">
                <h2 className='h2-description'>Actors:</h2>
                <div>
                    {movie.actors_list && movie.actors_list.length > 0 ? (
                        movie.actors_list.map((actor, index) => (
                            <span key={actor.first_name + actor.last_name}
                                  className="movie-description">
                    {actor.first_name} {actor.last_name}
                                {index < movie.actors_list.length - 1 && ', '}
                </span>
                        ))
                    ) : (
                        <p className="movie-description">No actors available</p>
                    )}
                </div>
            </div>

        </div>)
}

export default MovieInfo;
