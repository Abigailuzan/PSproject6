import React,{useState } from 'react';
import Password from './Password'
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../UseHooks/useLocalStorage'
import { Link } from 'react-router-dom';
import '../Stlyles/Form.css';
import axios from "axios";

function FromSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState(null);
  const navigate = useNavigate();
  const storge = useLocalStorage();

  const handleSubmit = async (event) => {
      event.preventDefault();
      try{
          if (email.includes('staff')){
              await axios.get(`http://localhost:5000/admins/email/${email}`)
                  .then(response => {
                      console.log("response data: ", response.data);
                      let admin = response.data;
                      if(admin.password !== password)
                      {
                          setPassword('');
                          throw new Error('password incorrect')
                      }
                      storge.set({id: admin.admin_id ,email:admin.email,userName:admin.username,userLastName:admin.last_name});
                      navigate("/home");
                  })
          }
          else{
              await axios.get(`http://localhost:5000/customers/email/${email}`)
                  .then(response => {
                      console.log("response data: ", response.data);
                      let customer = response.data;
                      if(customer.password !== password)
                      {
                          setPassword('');
                          throw new Error('password incorrect')
                      }
                      storge.set({id: customer.customer_id ,email:customer.email, userName:customer.first_name, userLastName:customer.last_name});
                      navigate("/home");
                  })
          }
      }
      catch(error) {
          if (error.response) {
              console.error(`ERROR: ${error.response.data.error || error.response.data.message || 'Unknown error from server'}`);
              setError(error.response.data.error || error.response.data.message || 'Unknown error from server');
          } else {
              console.error(`ERROR: ${error.message}`);
              setError(error.message);
          }
      }
  }
  return (
    <div className="form-container-new">
      <form onSubmit={handleSubmit}  className="user-form"> 
         <Link to="/create-account" className="link"> Create account</Link>
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
        <Password setPassword={setPassword}  password={password} />
         {error && <p className='error-message'>{error}</p>}
        <br />
        <input type="submit" className="submit-button" />
      </form>
    </div>
  );
}

export default  FromSignIn;