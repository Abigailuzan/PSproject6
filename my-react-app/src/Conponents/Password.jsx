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

        /*if (regex.test(passwordValue)) {
            //setError('');
        } else {
            let errorMsg = 'Password must contain at least: ';
            if (!/(?=.*[a-z])/.test(passwordValue)) errorMsg += 'one lowercase letter, ';
            if (!/(?=.*[A-Z])/.test(passwordValue)) errorMsg += 'one uppercase letter, ';
            if (!/(?=.*\d)/.test(passwordValue)) errorMsg += 'one number, ';
            if (!/(?=.*[@$!%*?&])/.test(passwordValue)) errorMsg += 'one special character, ';
            if (passwordValue.length < 8) errorMsg += 'minimum of 8 characters.';
            //setError(errorMsg);
        }*/
    }

    return (
        <div className="password-container">
            <input
                type={showPassword ? 'text' : 'password'}
                value={password || ''} // הגדרת ערך הסיסמה ל-ריק אם אין ערך
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
