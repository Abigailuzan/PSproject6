import React from 'react'
import '../Stlyles/MovieInfo.css'; 

function MovieInfo({moviename}) {
    let description="The wife of a band leader constantly tries to become a star - in spite of her having no talent, and gets herself (along with her best friend) into the funniest predicaments.";
    let videoUrl = 'https://www.youtube.com/embed/1LwMPdtamBo';
  return (
    <div>
    <iframe className="video-container"
      width="900"
      height="600"
      src={videoUrl}
      title={moviename}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
     <div className="description-container">
                <h2>Description:</h2>
                <p className="movie-description">{description}</p>
            </div>
  </div>)
}

export default MovieInfo