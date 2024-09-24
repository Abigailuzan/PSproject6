import React, { useState } from 'react';
import Password from './Password';
import '../Styles/Form.css';
import useLocalStorage from "../UseHooks/useLocalStorage";

function AddAdminForm({ onSubmit, error, clearError }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [localError, setLocalError] = useState(null);
    const storage = useLocalStorage();


    const handleInputChange = (setter, value) => {
        setter(value);
        clearError();
    };

    async function handleSubmit(event) {
        event.preventDefault();

        if (password !== password1) {
            setLocalError("Passwords are not the same.");
            return;
        }

        const userData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            active: 1,
            username: username,
            password: password,
            last_update: new Date().toISOString().split('T')[0],
            verification_email:storage.value.email
        };


        try {
            await onSubmit(userData);
        } catch (err) {
            setLocalError('Error occurred. Please try again.');
        }
    }

    return (
        <div className="form-container-new">
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => handleInputChange(setFirstName, e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => handleInputChange(setLastName, e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => handleInputChange(setEmail, e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>User Name</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => handleInputChange(setUsername, e.target.value)}
                        required
                    />
                </div>
                <label>Password</label>
                <Password label="Password" setPassword={setPassword} password={password} />
                <label>Confirm Password</label>
                <Password label="Confirm Password" setPassword={setPassword1} password={password1} />

                {(error || localError) && <p className="error-message">{error || localError}</p>}

                <br />
                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
}

export default AddAdminForm;
