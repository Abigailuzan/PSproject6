import React ,{useState,useEffect}from 'react'
import NavbarLeft from './NavbarLeft'
import NavbarRight from './NavbarRight'
import useLocalStorage from '../UseHooks/useLocalStorage'
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const storage = useLocalStorage();
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    useEffect(() => {
      if(storage.value!=null){
       setUsername(storage.value.userName);
      }
     }, [storage.value]);
     function handleClickLogout ()  {
        storage.remove();
        setUsername(null);
        navigate('/Home')
      };
  return (
    <div>
    <nav className="nav">
   <NavbarLeft name={username}/>
   <NavbarRight name={username} logOut={handleClickLogout} />
   </nav>
</div>
  )
}

export default Navbar
