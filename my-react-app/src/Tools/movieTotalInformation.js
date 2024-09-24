import axios from "axios";
import {useEffect} from "react";

export async function getTotalMovieInfo(id){
    let movie = {} ;
    // מביא סרט לפי ID
    await axios.get(`http://localhost:5000/movies/${id}`)
        .then(response => {
            movie= {...movie, ...response.data}
        })
        .catch(error => {
            console.error('There was an error fetching the movie!', error);
        });
    //מביא קטגוריה של הסרט המסוים לפי ID
    await axios.get(`http://localhost:5000/movies/categories/${id}`)
        .then(response => {
            movie = {...movie,
                category_id: response.data[0].category_id,
                category_name: response.data[0].name
            };
        })
        .catch(error => {
            console.error('There was an error fetching the categories!', error);
        });
    //מביא רשימת שחקנים לפי סרט מסוים ב ID
    await axios.get(`http://localhost:5000/movies/actors/${id}`)
        .then(response => {
            movie = {...movie,
                actors_list: response.data
            };
        })
        .catch(error => {
            console.error('There was an error fetching the actors!', error);
        });
    return movie;
}

export async function getAllCategoryList(setCategoryList){
    await axios.get('http://localhost:5000/categories')
        .then(response => {
            const categories = response.data;
            setCategoryList(categories);
        })
        .catch(error => {
            console.error('There was an error fetching the categories!', error);
        });
}
export async function getAllActorsList(setActors){
    await axios.get('http://localhost:5000/actors')
        .then(response => {
            const actors = response.data;
            setActors(actors);
        })
        .catch(error => {
            console.error('There was an error fetching the actors!', error);
        });
}

