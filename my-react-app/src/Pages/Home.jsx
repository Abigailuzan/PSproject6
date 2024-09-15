import React, { useState, useEffect } from 'react';
import NavbarLeft from '../Conponents/NavbarLeft';
import MovieCard from '../Conponents/MovieCard';
import '../Stlyles/Home.css';
import SearchIcon from '@mui/icons-material/Search';
import Footer from '../Conponents/Footer';
import useLocalStorage from '../UseHooks/useLocalStorage'
import InOutButton from '../Conponents/InOutButton'
import AdminToolBar from '../Conponents/AdminToolBar'
import axios from "axios";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
function Home() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // עמוד נוכחי
    const [totalMovies, setTotalMovies] = useState(0); // סה"כ סרטים
    const moviesPerPage = 20; // מספר הסרטים בעמוד
    const storage = useLocalStorage();
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        if (storage.value != null) {
            setUserName(storage.value.userName);
        }
    }, [storage.value]);

    useEffect(() => {
        axios.get(`http://localhost:5000/movies?limit=${moviesPerPage}&offset=${(currentPage - 1) * moviesPerPage}`)
            .then(response => {
                console.log("response data: ", response.data); // הדפס את התגובה
                setMovies(response.data.movies); // כאן שמרי את הסרטים
                setTotalMovies(response.data.total); // כאן שמרי את סה"כ הסרטים
            })
            .catch(error => {
                console.error('There was an error fetching the movies!', error);
            });
    }, [currentPage]);


    function handleClickLogout() {
        storage.remove();
        setUserName(null);
    }

    // פונקציות מעבר בין עמודים
    const handleNextPage = () => {
        if (currentPage * moviesPerPage < totalMovies) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="home-container">
            <div>
                <nav className="nav">
                    <NavbarLeft name={userName}/>
                    <h1>Welcome {userName ? userName : ' '}</h1>
                    <div className="nav-actions">
                        {storage.value && storage.value.email && storage.value.email.includes('staff') &&
                            <AdminToolBar/>}
                        <InOutButton name={userName} setUsername={setUserName}
                                     logOut={handleClickLogout}/>
                    </div>
                </nav>
                <div className="search-bar">
                    <input className="search-input" placeholder="Search..."/>
                    <button className="search-button">
                        <SearchIcon/>
                    </button>
                </div>
            </div>
            <div className="home-content">
                {movies && movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <MovieCard key={index} {...movie} storage={storage}/>
                    ))
                ) : (
                    <p>No movies available.</p>
                )}
            </div>

            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <ArrowBackIosNewIcon fontSize='small'/>
                </button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage}
                        disabled={currentPage * moviesPerPage >= totalMovies}>
                    <ArrowForwardIosIcon fontSize='small'/>
                </button>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;
