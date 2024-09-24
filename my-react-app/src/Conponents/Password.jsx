import React, { useState } from 'react';
import '../Styles/Password.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Password({ setPassword, password }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    }

    const onChangePassword = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    }

    return (
        <div className="password-container">
            <input
                type={showPassword ? 'text' : 'password'}
                value={password || ''}
                onChange={onChangePassword}
                required
                className="input-box password-input"
            />
            <button type="button" onClick={toggleShowPassword} className="toggle-button">
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
        </div>
    );
}

export default Password;
