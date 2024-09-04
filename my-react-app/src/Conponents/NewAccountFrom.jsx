import React  from 'react'
import { useNavigate } from 'react-router-dom';
//import {fetchData} from '../APIServer'
import Password from './Password'
import { useState } from 'react';
function NewAccountForm() {
  const [username, setUsername] = useState('');
  const [error,setError]=useState(null);
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if(password != password1){
      setError("passwords are not the same");
    }
    else if(error!="username exist try different"){
      alert("Register")
    //   navigate('info', { state: { username, password } });
    navigate("/home");
    }
  }
  const handleChangeName=(event)=>{
    const name = event.target.value;
    if(name!=''){
//       fetchData(`users?username=${name}`)
//       .then(res=>{
//         if(res.length!=0){
//           throw "username exist try different";
//         }
//       }
//       ).catch((error)=>{setError(error)});      
  }
  setUsername(name);
  setError(null);
  }

  return (
    <form onSubmit={handleSubmit}>
     <input 
          type="text" 
          name="username"
          placeholder="username"
          value={username}
          onChange={handleChangeName}
          required
          className="input-box"
        />
        <Password setPassword={setPassword} password={password} />
        <Password setPassword={setPassword1} password={password1} />
       {error && <p className='error-message'>{error}</p>}
       <br />
        <input type="submit" className="submit-button" />
    </form>
  )
}

export default NewAccountForm