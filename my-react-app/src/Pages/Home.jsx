
import React ,{useState,useEffect} from 'react';
import NavbarLeft from '../Conponents/NavbarLeft';
import MovieCard from '../Conponents/MovieCard';
import '../Stlyles/Home.css';
import SearchIcon from '@mui/icons-material/Search';
import Footer from '../Conponents/Footer';
import useLocalStorage from '../UseHooks/useLocalStorage'
import InOutButton from '../Conponents/InOutButton'
import AdminToolBar from '../Conponents/AdminToolBar'

const movies = [
  { title: 'Bruh',  image: 'bruh.jpg' },
  { title: 'Bruh',  image: 'bruh.jpg' },
  { title: 'Bruh',  image: 'bruh.jpg' },
  { title: 'Bruh', image: 'bruh.jpg' },
  { title: 'Bruh',  image: 'bruh.jpg' },
  { title: 'Bruh',  image: 'bruh.jpg' },
  { title: 'Bruh',  image: 'bruh.jpg' },
  { title: 'Bruh',  image: 'bruh.jpg' },
  { title: 'Bruh',  image: 'bruh.jpg' },
  { title: 'Bruh',  image: 'bruh.jpg' },
  { title: 'Bruh',  image: 'bruh.jpg' },
  { title: 'Bruh',  image: 'bruh.jpg' },
];
function Home () {
  const storage = useLocalStorage();
  const [username, setUsername] = useState(null);
  let admin=false;
  useEffect(() => {
    if(storage.value!=null){
     setUsername(storage.value.username);
     admin=storage.value.admin;
    }
   }, [storage.value]);
   function handleClickLogout ()  {
    storage.remove();
    setUsername(null); 
  };
  return (
    <div className="home-container">
     <div>
      <nav className="nav">
        <NavbarLeft name={username} />
        <h1>Welcome  {username ? username : ' '} </h1>
        <div className="nav-actions">
       {storage.addmin &&<AdminToolBar/>}
       <InOutButton name={username}   setUsername={setUsername}  logOut={handleClickLogout}/>
       </div>
      </nav> 
      <div className="search-bar">
        <input className="search-input" placeholder="Search..." />
        <button className="search-button">
          <SearchIcon />
        </button>
       </div> 
      </div>
      <div className="home-content">
        {movies.map((movie, index) => (
          <MovieCard key={index} {...movie} storage={storage} />
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
