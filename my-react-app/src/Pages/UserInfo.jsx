import React, { useEffect, useState } from 'react';
import Navbar from '../Conponents/Navbar';
import UserInfoData from '../Conponents/UserInfoData';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../UseHooks/useLocalStorage';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import MovieCard from "../Conponents/MovieCard";

function UserInfo() {
    const storage = useLocalStorage("currentUser");
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [localError, setLocalError] = useState(null);
    const [movies, setMovies] = useState([]);
    const userData = storage.value || { userName: '', email: '' };

    useEffect(() => {
        axios.get(`http://localhost:5000/history/${storage.value.id}`)
            .then(response => {
                const sortedMovies = response.data
                    .sort((a, b) => new Date(a.last_update) - new Date(b.last_update))
                    .slice(-7);

                setMovies(sortedMovies);
            })
            .catch(error => {
                console.error('Error fetching user history:', error);
            });
    }, [storage.value]);

    function OnDelete() {
        const userConfirmed = window.confirm('Are you sure you want to delete your account?');
        if (userConfirmed) {
            if (storage.value.email.includes('staff')) {
                axios.delete(`http://localhost:5000/admins/${storage.value.id}/${storage.value.email}`)
                    .then(response => {
                        console.log("response data with ok: ", response.data);
                        alert('admin deleted successfully.');
                        storage.remove();
                        navigate('/home');
                    })
                    .catch(error => {
                        if (error.response && error.response.data && error.response.data.error) {
                            setError(error.response.data.error);
                        } else {
                            setError('An unknown error occurred');
                        }
                    });
            } else {
                axios.delete(`http://localhost:5000/customers/${storage.value.id}`)
                    .then(response => {
                        console.log("response data with ok: ", response.data);
                        alert('Customer deleted successfully.');
                    })
                    .catch(error => {
                        console.error('There was an error deleting the customer!', error);
                    });
                axios.delete(`http://localhost:5000/history/${storage.value.id}`)
                    .then(response => {
                        console.log("response data with ok: ", response.data);
                        alert('Customer history also deleted successfully.');
                        storage.remove();
                        navigate('/home');
                    })
                    .catch(error => {
                        console.error('There was an error deleting the customer history!', error);
                    });
            }
        }
    }

    return (
        <div>
            <Navbar />
            <h1>User Information</h1>
            <UserInfoData user={userData} />
            {(error || localError) && <p className="error-message">{error || localError}</p>}

            {/* Move the buttons under the UserInfoData component */}
            <div className="button-container">
                <button onClick={() => navigate('/user-info/edit')}>
                    <ModeEditIcon />
                </button>
                <button onClick={OnDelete}>
                    <DeleteIcon />
                </button>
            </div>

            <div className="history-content">
                <h1>Your History:</h1>
                {movies && movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <MovieCard key={index} {...movie} storage={storage} />
                    ))
                ) : (
                    <p>There is not history yet for you.</p>
                )}
            </div>
        </div>
    );
}

export default UserInfo;
