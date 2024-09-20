import React, { useState } from 'react';
import Password from './Password';
import '../Styles/Form.css';

function NewAccount({ onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [error, setError] = useState(null);


 async function  handleSubmit  (event) {
    event.preventDefault();
    if (password !== password1) {
      setError("Passwords are not the same.");
      return;
    }
      const userData = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          active:1,
          create_date: new Date().toISOString().split('T')[0],
          last_update :  new Date().toISOString().split('T')[0],
          password: password,
      };
      await onSubmit(userData,setError);
  }

  return (
    <div className="form-container-new">
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
        <label>Password</label>
        <Password label="Password" setPassword={setPassword} password={password} />
        <label>Confirm Password</label>
        <Password label="Confirm Password" setPassword={setPassword1} password={password1}  />
        {error && <p className='error-message'>{error}</p>}
        <br />
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
}

export default NewAccount;
