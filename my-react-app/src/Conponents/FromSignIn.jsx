import React,{useState } from 'react';
import Password from './Password'
import { useNavigate } from 'react-router-dom';
//import useLocalStorage from '../UseHook/useLocalStorage'
//import {fetchData} from '../APIServer'
function FromSignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState(null);
  const navigate = useNavigate();
  //const storge = useLocalStorage();
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
    navigate("/home");
    
  }
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input-box"
        />
        <br />
        <Password setPassword={setPassword} password={password} />
         {error && <p className='error-message'>{error}</p>}
        <br />
        <input type="submit" className="submit-button" />
      </form>
    </div>
  );
}

export default  FromSignIn;