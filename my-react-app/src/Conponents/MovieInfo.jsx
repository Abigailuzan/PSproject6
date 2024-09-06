import React from 'react'
import '../Stlyles/MovieInfo.css'; 

function MovieInfo({moviename}) {
    let description="";
    let videoUrl = 'https://www.youtube.com/embed/1LwMPdtamBo';
  return (
    <div>
    <iframe className="video-container"
      width="800"
      height="600"
      src={videoUrl}
      title={moviename}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
    <p>{description}</p>
  </div>)
}

export default MovieInfo