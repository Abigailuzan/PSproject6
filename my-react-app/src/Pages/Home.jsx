import React, { useState, useEffect } from 'react';
import NavbarLeft from '../Conponents/NavbarLeft';
import MovieCard from '../Conponents/MovieCard';
import '../Styles/Home.css';
import SearchIcon from '@mui/icons-material/Search';
import Footer from '../Conponents/Footer';
import useLocalStorage from '../UseHooks/useLocalStorage';
import InOutButton from '../Conponents/InOutButton';
import AdminToolBar from '../Conponents/AdminToolBar';
import axios from "axios";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getAllCategoryList } from "../Tools/movieTotalInformation";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function Home() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalMovies, setTotalMovies] = useState(0);
    const moviesPerPage = 20;
    const storage = useLocalStorage();
    const [userName, setUserName] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [releaseYear, setReleaseYear] = useState('');
    const [length, setLength] = useState('');
    const [rating, setRating] = useState('');
    const [category, setCategory] = useState({});

    useEffect(() => {
        getAllCategoryList(setCategoryList).then(r => null);
    }, []);

    useEffect(() => {
        if (storage.value != null) {
            setUserName(storage.value.userName);
        }
    }, [storage.value]);

    useEffect(() => {
        axios.get(`http://localhost:5000/movies?limit=${moviesPerPage}&offset=${(currentPage - 1) * moviesPerPage}`)
            .then(response => {
                console.log("response data: ", response.data);
                setMovies(response.data.movies);
                setTotalMovies(response.data.total);
            })
            .catch(error => {
                console.error('There was an error fetching the movies!', error);
            });
    }, [currentPage]);

    function handleClickLogout() {
        storage.remove();
        setUserName(null);
    }

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

    const handleSearch = () => {
        const sanitizedSearchText = searchText.toUpperCase();
        const illegalCharacters = /[^A-Z\s]/;
        if (illegalCharacters.test(sanitizedSearchText)) {
            alert('Please enter only letters and spaces.');
            return;
        }
        axios.get(`http://localhost:5000/movies/title/${sanitizedSearchText}?limit=${moviesPerPage}&offset=${(currentPage - 1) * moviesPerPage}`)
            .then(response => {
                console.log("response data: ", response.data);
                setMovies(response.data.movies);
                setTotalMovies(response.data.total);
            })
            .catch(error => {
                console.error('There was an error fetching the movies!', error);
            });
    };

    async function handleFilter() {
        console.log(category.name,'rating' + rating,'release year' + releaseYear,'length ' + length)
        const filterData  = {
            name:category.name || null,
            release_year : releaseYear|| null,
            length:length||null,
            rating:rating|| null
        }
        const queryParams = new URLSearchParams(filterData).toString();
        axios.get(`http://localhost:5000/moviesFilters?${queryParams}`)
            .then(response => {
                console.log("response data: ", response.data);
                // setMovies(response.data.movies);
                // setTotalMovies(response.data.total);
            })
            .catch(error => {
                console.error('There was an error fetching the movies!', error);
            });

    }

    return (
        <div className="home-container">
            <nav className="nav">
                <NavbarLeft name={userName} />
                <h1>Welcome {userName ? userName : ' '}</h1>
                <div className="nav-actions">
                    {storage.value && storage.value.email && storage.value.email.includes('staff') && <AdminToolBar />}
                    <InOutButton name={userName} setUsername={setUserName} logOut={handleClickLogout} />
                </div>
            </nav>
            <div className="filters-container">
                <div className="filter">
                    <Autocomplete
                        value={category || null}
                        onChange={(e, newValue) => setCategory(newValue)}
                        options={categoryList}
                        getOptionLabel={(option) => option.name ? `${option.name}` : "category"}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Category"
                                placeholder="Select category"
                                size="small"
                            />
                        }
                    />

                </div>
                <div className="filter">
                    <Autocomplete
                        value={releaseYear || null}
                        onChange={(e, newValue) => setReleaseYear(newValue)}
                        options={Array.from(new Array(131), (val, index) => 1900 + index)}
                        getOptionLabel={(option) => `${option}`}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Year"
                                placeholder="Select year"
                                size="small"
                            />
                        }
                    />

                </div>
                <div className="filter">
                    <Autocomplete
                        value={length || null}
                        onChange={(e, newValue) => setLength(newValue)}
                        options={Array.from(new Array(301), (val, index) => 60 + index)}
                        getOptionLabel={(option) => `${option} minutes`}
                        isOptionEqualToValue={(option, value) => option === value}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Length"
                                placeholder="Select movie length"
                                required
                                size="small"
                            />
                        }
                    />
                </div>
                <div className="filter">
                    <Autocomplete
                        value={rating || null}
                        onChange={(e, newValue) => setRating(newValue)}
                        options={['G', 'PG', 'PG-13', 'R', 'NC-17']}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) => option === value}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Rating"
                                placeholder="Select movie rating"
                                required
                                size="small"
                            />
                        }
                    />
                    <button onClick={handleFilter}><FilterAltIcon /></button>
                    <div className="search-bar">
                        <input
                            className="search-input"
                            placeholder="Search..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button className="search-button" onClick={handleSearch}>
                            <SearchIcon/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="home-content">
                {movies && movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <MovieCard key={index} {...movie} storage={storage} />
                    ))
                ) : (
                    <p>No movies available.</p>
                )}
            </div>

            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <ArrowBackIosNewIcon fontSize='small' />
                </button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage} disabled={currentPage * moviesPerPage >= totalMovies}>
                    <ArrowForwardIosIcon fontSize='small' />
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
