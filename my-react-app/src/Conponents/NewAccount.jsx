import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Password from './Password';

function NeweAccount({ onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== password1) {
      setError("Passwords are not the same.");
      return;
    }
    if (error !== "Username exists, try a different one.") {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: password, // Be careful with handling plain text passwords!
      };
      onSubmit(userData); // Assuming onSubmit performs further actions like an API call
      navigate("/home"); // Navigate on successful submission
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <Password label="Password" setPassword={setPassword} password={password} />
        <Password label="Confirm Password" setPassword={setPassword1} password={password1} />
        {error && <p className='error-message'>{error}</p>}
        <br />
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
}

export default NeweAccount;
