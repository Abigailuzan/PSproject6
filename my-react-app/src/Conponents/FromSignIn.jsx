import React,{useState } from 'react';
import Password from './Password'
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../UseHooks/useLocalStorage'
import { Link } from 'react-router-dom';
import '../Stlyles/Form.css'; 

function FromSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState(null);
  const navigate = useNavigate();
  const storge = useLocalStorage();
  const handleSubmit = (event) => {
    event.preventDefault();
    // fetchData(`users?username=${username}`)
    // .then(res=>
    // {
    //     if (res.length==0){
    //       throw "username does not exist";
    //     }
    //    else  if(res[0].website!=password){
    //         throw "passràword is not correct";
    //     }
    //     else{
    //         setError(null);
    //         navigate("/home");
    //         storge.set({username:username,id:res[0].id});
    //     }
    // }
    // ).catch((error)=>{setError(error)})
    storge.set({id: 1 ,email:email, userName:'ben'});
    navigate("/home");
    
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
        <Password setPassword={setPassword} password={password} />
         {error && <p className='error-message'>{error}</p>}
        <br />
        <input type="submit" className="submit-button" />
      </form>
    </div>
  );
}

export default  FromSignIn;