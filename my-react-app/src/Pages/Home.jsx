
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
  { id:1,title: 'Bruh',  image: 'bruh.jpg' },
  { id:1,title: 'Bruh',  image: 'bruh.jpg' },
  { id:1,title: 'Bruh',  image: 'bruh.jpg' },
  {id:1, title: 'Bruh', image: 'bruh.jpg' },
  {id:1, title: 'Bruh',  image: 'bruh.jpg' },
  { id:1,title: 'Bruh',  image: 'bruh.jpg' },
  { id:1,title: 'Bruh',  image: 'bruh.jpg' },
  {id:1, title: 'Bruh',  image: 'bruh.jpg' },
  {id:1, title: 'Bruh',  image: 'bruh.jpg' },
  { id:1,title: 'Bruh',  image: 'bruh.jpg' },
  { id:1,title: 'Bruh',  image: 'bruh.jpg' },
  { id:1,title: 'Bruh',  image: 'bruh.jpg' },
];
function Home () {
  const storage = useLocalStorage();
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    if(storage.value!=null){
     setUserName(storage.value.userName);
    }
   }, [storage.value]);
   function handleClickLogout ()  {
    storage.remove();
    setUserName(null); 
  };
  return (
    <div className="home-container">
     <div>
      <nav className="nav">
        <NavbarLeft name={userName} />
        <h1>Welcome  {userName ? userName : ' '} </h1>
        <div className="nav-actions">
        {storage.value && storage.value.email && storage.value.email.includes('@staff') && <AdminToolBar />} 
       <InOutButton name={userName}   setUsername={setUserName}  logOut={handleClickLogout}/>
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
