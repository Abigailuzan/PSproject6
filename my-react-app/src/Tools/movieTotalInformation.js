import axios from "axios";

export async function getTotalMovieInfo(id){
    let movie = {} ;
    // מביא סרט לפי ID
    await axios.get(`http://localhost:5000/movies/${id}`)
        .then(response => {
            console.log("response data: ", response.data);
            movie= {...movie, ...response.data}
        })
        .catch(error => {
            console.error('There was an error fetching the movie!', error);
        });
    //מביא קטגוריה של הסרט המסוים לפי ID
    await axios.get(`http://localhost:5000/movies/categories/${id}`)
        .then(response => {
            console.log(response.data);
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
