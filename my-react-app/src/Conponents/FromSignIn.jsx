import React, { useState } from 'react';
import Password from './Password';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../UseHooks/useLocalStorage';
import { Link } from 'react-router-dom';
import '../Stlyles/Form.css';
import axios from 'axios';

function FromSignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const storage = useLocalStorage();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email.includes('staff')) {
            axios
                .get(`http://localhost:5000/admins/email/${email}`)
                .then((response) => {
                    console.log('response data: ', response.data);
                    let admin = response.data;

                    // בדיקה אם הסיסמה שגויה
                    if (admin.password !== password) {
                        setPassword(''); // מאפסים את שדה הסיסמה
                        throw new Error('password incorrect'); // זורקים שגיאה לעצור את התהליך ולהציג הודעה
                    }
                    storage.set({
                        id: admin.admin_id,
                        email: admin.email,
                        userName: admin.username,
                        userLastName: admin.last_name,
                    });

                    navigate('/home');
                })
                .catch((error) => {
                    console.error('Error: ', error);

                    // הצגת הודעת השגיאה למשתמש
                    if (error.response && error.response.data && error.response.data.error) {
                        setError(error.response.data.error);
                    } else {
                        setError(error.message || 'Unknown error occurred');
                    }
                });
        } else {
            await axios
                .get(`http://localhost:5000/customers/email/${email}`)
                .then((response) => {
                    console.log('response data: ', response.data);
                    let customer = response.data;

                    if (customer.password !== password) {
                        setPassword(''); // מאפסים את שדה הסיסמה
                        throw new Error('password incorrect'); // זורקים שגיאה כדי להפסיק את התהליך
                    }

                    storage.set({
                        id: customer.customer_id,
                        email: customer.email,
                        userName: customer.first_name,
                        userLastName: customer.last_name,
                    });
                    navigate('/home');
                })
                .catch((error) => {
                    console.error('Error: ', error);

                    if (error.response && error.response.data && error.response.data.error) {
                        setError(error.response.data.error);
                    } else {
                        setError(error.message || 'Unknown error occurred');
                    }
                });
        }
    };

    return (
        <div className="form-container-new">
            <form onSubmit={handleSubmit} className="user-form">
                <Link to="/create-account" className="link">
                    Create account
                </Link>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <br />
                <label>Password</label>
                <Password setPassword={setPassword} password={password} />
                {error && <p className="error-message">{error}</p>}
                <br />
                <input type="submit" className="submit-button" />
            </form>
        </div>
    );
}

export default FromSignIn;
