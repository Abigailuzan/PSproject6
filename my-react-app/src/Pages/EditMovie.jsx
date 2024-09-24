import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Navbar from '../Conponents/Navbar'
import EditMovieForm from '../Conponents/EditMovieForm';
import axios from "axios";
import {getAllActorsList, getAllCategoryList, getTotalMovieInfo} from '../Tools/movieTotalInformation'
import { useNavigate } from 'react-router-dom';
import useLocalStorage from "../UseHooks/useLocalStorage";


function EditMovie() {
    const [categoryList,setCategoryList] = useState([])
    const [actors,setActors] = useState([])
    const { id ,title } = useParams();
    const [movie,setMovie] = useState({});
    const navigate = useNavigate();
    const storage = useLocalStorage();

    useEffect(() => {
        const fetchMovieData = async () => {
            const fetchedMovie = await getTotalMovieInfo(id);
            setMovie(fetchedMovie);
        };
        fetchMovieData().then(r => null); // קריאה לפונקציה האסינכרונית
    }, [id]);
    // get all categories from DB
    useEffect(() => {
        getAllCategoryList(setCategoryList).then(r => null)
        getAllActorsList(setActors).then(r => null)
    }, []);

  async function onSubmit(movie,id){
      await axios.put(`http://localhost:5000/movies/${id}/${storage.value.email}`,movie)
          .then(response => {
              const movieUpdate = response.data;
              alert('movie was updating successfully')
          })
          .catch(error => {
              console.error('There was an error updating the movie!', error);
          });
      const category_movie_update =
          {
              film_id:id,
              category_id:movie.category.category_id,
              last_update:movie.last_update
          }
      await axios.put(`http://localhost:5000/moviecategories/${id}/${movie.category.category_id}/${storage.value.email}`,category_movie_update)
          .then(response => {
              const categoryMovieUpdate = response.data;
          })
          .catch(error => {
              console.error('There was an error updating the category!', error);
          });
      await axios.delete(`http://localhost:5000/movieactors/${id}/${storage.value.email}`)
          .then(response => {
              const actorMovieUpdate = response.data;
          })
          .catch(error => {
              console.error('There was an error updating the actors!', error);
          });
       movie.actors.map(async (actor)=>{
           const actor_movie_update = {
               actor_id:actor.actor_id,
               film_id: id,
               last_update:movie.last_update,
               verification_email:storage.value.email
           }
          await axios.post(`http://localhost:5000/movieactors`,actor_movie_update)
              .then(response => {
                  const actorMovieUpdate = response.data;
              })
              .catch(error => {
                  console.error('There was an error updating the actors!', error);
              });
      })
      navigate(`/movie/${id}/${movie.title}`)
  }
    return (
    <div>
       <Navbar/>
       <h1>Edit Movie</h1>
       <EditMovieForm movie={movie} onSubmit={onSubmit} categoryList = {categoryList} actorsList={actors}/>
       </div>
  )
}

export default EditMovie