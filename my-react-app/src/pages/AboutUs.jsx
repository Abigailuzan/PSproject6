import React, { useEffect } from 'react';
import '../Stlyles/AboutUs.css'
import Article from '../Conponents/Article';
import Table from '../Conponents/Table';
import Navbar from '../Conponents/Navbar';

function AboutUs () {

  return (
    <div>
      <Navbar/>
      <div className="background_text">
        <h1>ABOUT US</h1>
        <a href="#family_video">Watch what happens in my life</a>
         <Article/>
        <div className="grid-container">
          <div className="grid-item">
            <video
              id="family_video"
              src="../../Videos/family watchig movie.mp4"
              width="550"
              height="500"
              controls
              autoPlay
              loop
              muted
            ></video>
          </div>
         <Table/>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
