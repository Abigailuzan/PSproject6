import React ,{useState,useEffect} from 'react';
import NavbarLeft from '../Conponents/NavbarLeft';
import MovieCard from '../Conponents/MovieCard';
import '../Stlyles/Home.css';
import SearchIcon from '@mui/icons-material/Search';
import Footer from '../Conponents/Footer';
import useLocalStorage from '../UseHooks/useLocalStorage'
import InOutButton from '../Conponents/InOutButton'
import AdminToolBar from '../Conponents/AdminToolBar'
import axios from "axios";

/*let movies = [
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
];*/
function Home () {
    const [movies, setMovies] = useState([]);
    const storage = useLocalStorage();
    const [userName, setUserName] = useState(null);
    useEffect(() => {
    if(storage.value!=null){
     setUserName(storage.value.userName);
    }
   }, [storage.value]);
  useEffect( () => {
        axios.get('http://localhost:5000/movies') // קריאה לשרת כדי להביא את הסרטים
            .then(response => {
                console.log("response data: ",response.data); // תדפיס את הנתונים ב-console לבדיקה
                setMovies(response.data.slice(980,1000)); // שמור את הנתונים ב-state
                console.log(movies)
            })
            .catch(error => {
                console.error('There was an error fetching the movies!', error);
            });
    }, []); // מתבצע פעם אחת כשהרכיב נטען

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
