import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Password from './Password';
import '../Stlyles/Form.css'; 

function AddAdminForm({onSubmit}) {
     const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
   async function  handleSubmit  (event) {
      event.preventDefault();
      if (password !== password1) {
        setError("Passwords are not the same.");
        return;
      }
      if(email.includes("@staff")){
      if (error !== "Email exists, try a different one.") {
        const userData = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          username:username,
        };
        await  onSubmit(userData); 
        navigate("/home");
      }
    }
    else{
        setError("Email not correct");
    }
    };
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
    <div className="form-group">
      <label>User Name</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
    <label>Password</label>
    <Password label="Password" setPassword={setPassword} password={password} />
    <label>Confirm Password</label>
    <Password label="Confirm Password" setPassword={setPassword1} password={password1} />
    {error && <p className='error-message'>{error}</p>}
    <br />
    <button type="submit" className="submit-button">Register</button>
  </form>
  </div>
  )
}

export default AddAdminForm