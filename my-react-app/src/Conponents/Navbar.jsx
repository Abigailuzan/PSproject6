import React ,{useState,useEffect}from 'react'
import NavbarLeft from './NavbarLeft'
import NavbarRight from './NavbarRight'
import useLocalStorage from '../UseHooks/useLocalStorage'
function Navbar() {
    const storage = useLocalStorage();
    const [username, setUsername] = useState(null);
    useEffect(() => {
      if(storage.value!=null){
       setUsername(storage.value.username);
      }
     }, [storage.value]);
     function handleClickLogout ()  {
        storage.remove();
        setUsername(null); 
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
