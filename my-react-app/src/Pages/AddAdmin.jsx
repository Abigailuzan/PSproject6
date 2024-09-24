import React, { useState } from 'react';
import Navbar from '../Conponents/Navbar';
import AddAdminForm from '../Conponents/AddAdminForm';
import axios from "axios";
import useLocalStorage from "../UseHooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

function AddAdmin() {
    const storage = useLocalStorage();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const clearError = () => setError(null);

    function onSubmit(admins) {
        axios.post('http://localhost:5000/admins', admins)
            .then(response => {
                const addedAdmin = response.data;
                storage.remove();
                storage.set({
                    id: addedAdmin.admin_id,
                    email: addedAdmin.email,
                    userName: addedAdmin.first_name,
                    userLastName: addedAdmin.last_name
                });

                navigate("/home");
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.error) {
                    setError(error.response.data.error);
                } else {
                    setError('An unknown error occurred');
                }
            });
    }

    return (
        <div>
            <Navbar />
            <h1>Add Admin</h1>
            <AddAdminForm onSubmit={onSubmit} error={error} clearError={clearError} />
        </div>
    );
}

export default AddAdmin;
