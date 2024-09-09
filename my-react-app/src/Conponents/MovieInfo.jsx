import React from 'react'
import '../Stlyles/MovieInfo.css'; 
import MovieTool from './MovieTool';

function MovieInfo( { id ,title } ) {
    let description="The wife of a band leader constantly tries to become a star - in spite of her having no talent, and gets herself (along with her best friend) into the funniest predicaments.";
    let videoUrl = 'https://www.youtube.com/embed/1LwMPdtamBo';
  return (
    <div>
    <iframe className="video-container"
      width="900"
      height="600"
      src={videoUrl}
      title={title }
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
    <MovieTool  id={id} title={title} />
     <div className="description-container" >
         <h2 className='h2-description'>Description:</h2>
         <p className="movie-description">{description}</p>
     </div>
  </div>)
}

export default MovieInfo