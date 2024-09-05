
import React from 'react';
import NavbarLeft from '../Conponents/NavbarLeft';
import MovieCard from '../Conponents/MovieCard';
import '../Stlyles/Home.css';
import SearchIcon from '@mui/icons-material/Search';
import Footer from '../Conponents/Footer';
import InOutButton from '../Conponents/InOutButton'

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
      <nav className="nav">
        <NavbarLeft />
        <InOutButton/>
      </nav>
      <h1 className="home-h1">Welcome </h1>
      <div className="search-bar">
        <input className="search-input" placeholder="Search..." />
        <button className="search-button">
          <SearchIcon />
        </button>
      </div>
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
