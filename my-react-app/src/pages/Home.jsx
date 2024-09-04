
import React from 'react';
import Navbar from '../Conponents/Navbar';
import MovieCard from '../Conponents/MovieCard';
import '../Stlyles/Home.css';
import Footer from '../Conponents/Footer';

const movies = [
  { title: 'Bruh',  image: 'bruh.jpg' },
  { title: 'Bruh',  image: 'bruh.jpg' },
  { title: 'Bruh',  image: 'bruh.jpg' },
  { title: 'Bruh', image: 'bruh.jpg' },
  { title: 'Bruh',  image: 'bruh.jpg' },
  { title: 'Bruh',  image: 'bruh.jpg' },
  { title: 'Bruh',  image: 'bruh.jpg' },
  { title: 'Bruh',  image: 'bruh.jpg' },

  // Add more movie data here
];
function Home () {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        {movies.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
