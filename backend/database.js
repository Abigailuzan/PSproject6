const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'au270101',
    database: 'fullstack6-db',
    port: '3306'
}).promise();

// CRUD operations for the "customer" table
async function getCustomerByID(id) {
    const [rows] = await pool.query(
        `SELECT customer_id, first_name, last_name, email, active, 
        DATE_FORMAT(create_date, '%Y-%m-%d %H:%i:%s') AS create_date, 
        DATE_FORMAT(last_update, '%Y-%m-%d %H:%i:%s') AS last_update, 
        password 
        FROM customer 
        WHERE customer_id = ?`,
        [id]
    );

    return rows[0];
}
async function getAllCustomers() {
    const [rows] = await pool.query(`SELECT * FROM customer`);
    return rows;
}
async function insertCustomer(customer) {
        const [result] = await pool.query(
            `INSERT INTO customer (first_name, last_name, email, active, create_date, last_update, password) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [customer.first_name, customer.last_name, customer.email, customer.active, customer.create_date, customer.last_update, customer.password]
        );
        return getCustomerByID(result.insertId);
}
async function updateCustomer(id, customer) {
    try {
        const [result] = await pool.query(
            `UPDATE customer SET first_name = ?, last_name = ?, email = ?, active = ?, last_update = ?, password = ? WHERE customer_id = ?`,
            [customer.first_name, customer.last_name, customer.email, customer.active, customer.last_update, customer.password, id]
        );
        if (result.affectedRows === 0) {
            console.log('error databse')
            throw new Error('Customer not found');
        }
        return getCustomerByID(id);
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error; // יזרוק את השגיאה כך שתוכל לטפל בה מאוחר יותר
    }
}
async function deleteCustomer(id) {
    const [result] = await pool.query(`DELETE FROM customer WHERE customer_id = ?`, [id]);
    return result.affectedRows > 0;
}
async function getCustomerByEmail(email) {
    const [rows] = await pool.query(`SELECT * FROM customer WHERE email = ?`, [email]);
    return rows[0] ;
}

// CRUD operations for the "movie" table
async function getMovieByID(id) {
    const [rows] = await pool.query(`SELECT * FROM movie WHERE film_id = ?`, [id]);
    return rows[0];
}
async function getAllMovies(limit,offset) {
    const [rows] = await pool.query(`SELECT * FROM movie LIMIT ? OFFSET ?`,[limit,offset]);
    return rows;
}
async function getMoviesByTitle(title, limit, offset) {
    const searchTitle = `%${title}%`;
    const [rows] = await pool.query(`SELECT * FROM movie WHERE LOWER(title) LIKE LOWER(?) LIMIT ? OFFSET ?`, [searchTitle, limit, offset]);
    return rows;
}

async function getTotalMovies() {
    const [[{ total }]] = await pool.query(`SELECT COUNT(*) as total FROM movie`);
    return total;
}
async function getTotalMoviesByTitle(title) {
    const searchTitle = `%${title}%`;
    const [rows] = await pool.query(`SELECT COUNT(*) as total FROM movie WHERE LOWER(title) LIKE LOWER(?)`, [searchTitle]);
    if (rows.length > 0) {
        return rows[0].total;
    }
    return 0;
}

async function insertMovie(movie) {
    const [result] = await pool.query(
        `INSERT INTO movie (title, description, release_year,length, rating, last_update, movie_image, movie_video) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [movie.title, movie.description, movie.release_year,  movie.length, movie.rating, movie.last_update, movie.movie_image, movie.movie_video]
    );
    return getMovieByID(result.insertId);
}
async function updateMovie(id, movie) {
    const [result] = await pool.query(
        `UPDATE movie SET title = ?, description = ?, release_year = ?, length = ?, rating = ?, last_update = ?, movie_image = ?, movie_video = ? WHERE film_id = ?`,
        [movie.title, movie.description, movie.release_year,  movie.length, movie.rating, movie.last_update, movie.movie_image, movie.movie_video, id]
    );
    return getMovieByID(id);
}
async function deleteMovie(id) {
    const [result] = await pool.query(`DELETE FROM movie WHERE film_id = ?`, [id]);
    return result.affectedRows > 0;
}
async function updateMovieByTitle(title, updated_Movie) {
    const movie = await getMoviesByTitle(title);
    if (movie) {
        return updateMovie(movie.film_id, updated_Movie);
    } else {
        throw new Error('Movie not found');
    }
}


// CRUD operations for the "actor" table
async function getActorByID(id) {
    const [rows] = await pool.query(`SELECT * FROM actor WHERE actor_id = ?`, [id]);
    return rows[0];
}
async function getAllActors() {
    const [rows] = await pool.query(`SELECT * FROM actor`);
    return rows;
}
async function insertActor(actor) {
    const [result] = await pool.query(
        `INSERT INTO actor (first_name, last_name) VALUES (?, ?)`,
        [actor.first_name, actor.last_name]
    );
    return getActorByID(result.insertId);
}
async function updateActor(id, actor) {
    const [result] = await pool.query(
        `UPDATE actor SET first_name = ?, last_name = ? WHERE actor_id = ?`,
        [actor.first_name, actor.last_name, id]
    );
    return getActorByID(id);
}
async function deleteActor(id) {
    const [result] = await pool.query(`DELETE FROM actor WHERE actor_id = ?`, [id]);
    return result.affectedRows > 0;
}

// CRUD operations for the "payment" table
async function getPaymentByID(id) {
    const [rows] = await pool.query(`SELECT * FROM payment WHERE payment_id = ?`, [id]);
    return rows[0];
}
async function getAllPayments() {
    const [rows] = await pool.query(`SELECT * FROM payment`);
    return rows;
}
async function insertPayment(payment) {
    const [result] = await pool.query(
        `INSERT INTO payment (customer_id, rental_id, amount, payment_date, last_update) VALUES (?, ?, ?, ?, ?)`,
        [payment.customer_id, payment.rental_id, payment.amount, payment.payment_date, payment.last_update]
    );
    return getPaymentByID(result.insertId);
}
async function updatePayment(id, payment) {
    const [result] = await pool.query(
        `UPDATE payment SET customer_id = ?, rental_id = ?, amount = ?, payment_date = ?, last_update = ? WHERE payment_id = ?`,
        [payment.customer_id, payment.rental_id, payment.amount, payment.payment_date, payment.last_update,id]
    );
    return getPaymentByID(id);
}
async function deletePayment(id) {
    const [result] = await pool.query(`DELETE FROM payment WHERE payment_id = ?`, [id]);
    return result.affectedRows > 0;
}

// CRUD operations for the "history" table

async function getAllHistory(customer_id) {
    const [rows] = await pool.query(`
        SELECT movie.*
        FROM history
        JOIN movie ON history.film_id = movie.film_id
        WHERE history.customer_id = ?
    `, [customer_id]);
    return rows;
}


async function insertHistory(history) {
    const [result] = await pool.query(
        `INSERT INTO history (customer_id, film_id, last_update) VALUES (?, ?, ?)`,
        [history.customer_id, history.film_id, history.last_update]
    );
    return getAllHistory(history.customer_id);
}

async function updateHistory(id, history) {
    const [result] = await pool.query(
        `UPDATE history SET customer_id = ?, film_id = ?, last_update = ? WHERE customer_id = ?`,
        [history.customer_id, history.film_id, history.last_update, id]
    );
    return getAllHistory(id);
}

async function deleteHistory(id) {
    const [result] = await pool.query(`DELETE FROM history WHERE customer_id = ?`, [id]);
    return result;
}

// CRUD operations for the "city" table
async function getCityByID(id) {
    const [rows] = await pool.query(`SELECT * FROM city WHERE city_id = ?`, [id]);
    return rows[0];
}
async function getAllCities() {
    const [rows] = await pool.query(`SELECT * FROM city`);
    return rows;
}
async function insertCity(city) {
    const [result] = await pool.query(
        `INSERT INTO city (city, country_id, last_update) VALUES (?, ?, ?)`,
        [city.city, city.country_id, city.last_update]
    );
    return getCityByID(result.insertId);
}
async function updateCity(id, city) {
    const [result] = await pool.query(
        `UPDATE city SET city = ?, country_id = ?, last_update = ? WHERE city_id = ?`,
        [city.city, city.country_id, city.last_update, id]
    );
    return getCityByID(id);
}
async function deleteCity(id) {
    const [result] = await pool.query(`DELETE FROM city WHERE city_id = ?`, [id]);
    return result.affectedRows > 0;
}

// CRUD operations for the "country" table
async function getCountryByID(id) {
    const [rows] = await pool.query(`SELECT * FROM country WHERE country_id = ?`, [id]);
    return rows[0];
}
async function getAllCountries() {
    const [rows] = await pool.query(`SELECT * FROM country`);
    return rows;
}
async function insertCountry(country) {
    const [result] = await pool.query(
        `INSERT INTO country (country, last_update) VALUES (?, ?)`,
        [country.country, country.last_update]
    );
    return getCountryByID(result.insertId);
}
async function updateCountry(id, country) {
    const [result] = await pool.query(
        `UPDATE country SET country = ?, last_update = ? WHERE country_id = ?`,
        [country.country, country.last_update, id]
    );
    return getCountryByID(id);
}
async function deleteCountry(id) {
    const [result] = await pool.query(`DELETE FROM country WHERE country_id = ?`, [id]);
    return result.affectedRows > 0;
}

// CRUD operations for the "admin" table
async function getAdminByID(id) {
    const [rows] = await pool.query(`SELECT * FROM admin WHERE admin_id = ?`, [id]);
    return rows[0];
}
async function getAdminByMail(email) {
    const [rows] = await pool.query(`SELECT * FROM admin WHERE email = ?`, [email]);
    return rows[0];
}
async function getAllAdmins() {
    const [rows] = await pool.query(`SELECT * FROM admin`);
    return rows;
}
async function insertAdmin(admin) {
        const [result] = await pool.query(
            `INSERT INTO admin (first_name, last_name, email, active, username, password, last_update) VALUES ( ?, ?, ?, ?, ?, ?, ?)`,
            [admin.first_name, admin.last_name, admin.email, admin.active, admin.username, admin.password, admin.last_update]
        );
        return getAdminByID(result.insertId);
}
async function updateAdmin(id, admin) {
        const [result] = await pool.query(
            `UPDATE admin SET first_name = ?, last_name = ?, email = ?, active = ?, username = ?, password = ?, last_update = ? WHERE admin_id = ?`,
            [admin.first_name, admin.last_name, admin.email,  admin.active, admin.username,admin.password, admin.last_update, id]
        );
        return getAdminByID(id);
}
async function deleteAdmin(id) {
    const [result] = await pool.query(`DELETE FROM admin WHERE admin_id = ?`, [id]);
    return result.affectedRows > 0;
}

// CRUD operations for the "category" table
async function getCategoryByID(id) {
    const [rows] = await pool.query(`SELECT * FROM category WHERE category_id = ?`, [id]);
    return rows[0];
}
async function getAllCategories() {
    const [rows] = await pool.query(`SELECT * FROM category`);
    return rows;
}
async function insertCategory(category) {
    const [result] = await pool.query(
        `INSERT INTO category (name, last_update) VALUES (?, ?)`,
        [category.name, category.last_update]
    );
    return getCategoryByID(result.insertId);
}
async function updateCategory(id, category) {
    const [result] = await pool.query(
        `UPDATE category SET name = ?, last_update = ? WHERE category_id = ?`,
        [category.name, category.last_update, id]
    );
    return getCategoryByID(id);
}
async function deleteCategory(id) {
    const [result] = await pool.query(`DELETE FROM category WHERE category_id = ?`, [id]);
    return result.affectedRows > 0;
}

// CRUD operations for the "movie-actor" table
async function getMovieActorByIDs(actorId, filmId) {
    const [rows] = await pool.query(`SELECT * FROM movieactor WHERE actor_id = ? AND film_id = ?`, [actorId, filmId]);
    return rows[0];
}
async function getAllMovieActors() {
    const [rows] = await pool.query(`SELECT * FROM movieactor`);
    return rows;
}
async function insertMovieActor(movieActor) {
    const movieExists = await getMovieByID(movieActor.film_id);
    const actorExists = await getActorByID(movieActor.actor_id);

    if (!movieExists || !actorExists) {
        throw new Error('movie or actor does not exist');
    }

    const movieActorRelationExists = await getMovieActorByIDs(movieActor.actor_id, movieActor.film_id);
    if (movieActorRelationExists) {
        throw new Error('movie actor relation already exists');
    } else {
        const [result] = await pool.query(
            `INSERT INTO movieactor (actor_id, film_id, last_update) VALUES (?, ?, ?)`,
            [movieActor.actor_id, movieActor.film_id, movieActor.last_update]
        );
        return getMovieActorByIDs(movieActor.actor_id, movieActor.film_id);
    }

}
async function updateMovieActor(actorId, filmId, movieActor) {
    const movieExists = await getMovieByID(filmId);
    const actorExists = await getActorByID(actorId);

    if (!movieExists || !actorExists) {
        throw new Error('movie or actor does not exist');
    }

    const movieActorRelationExists = await getMovieActorByIDs(actorId, filmId);
    if (!movieActorRelationExists) {
        throw new Error('movie actor relation does not exists');}

    else{
        const [result] = await pool.query(
            `UPDATE movieactor SET actor_id = ?,film_id = ?,last_update = ? WHERE actor_id = ? AND film_id = ?`,
            [movieActor.actor_id,movieActor.film_id,movieActor.last_update, actorId, filmId]
        );
        return getMovieActorByIDs(actorId, filmId);
    }
}
async function deleteMovieActor(actorId, filmId) {
    const [result] = await pool.query(`DELETE FROM movieactor WHERE actor_id = ? AND film_id = ?`, [actorId, filmId]);
    return result.affectedRows > 0;
}
async function deleteMovieActorByFilmId( filmId) {
    const [result] = await pool.query(`DELETE FROM movieactor WHERE  film_id = ?`, [ filmId]);
    return result.affectedRows > 0;
}

// CRUD operations for the "movie-category" table
async function getMovieCategoryByIDs(filmId) {
    const [rows] = await pool.query(`SELECT * FROM moviecategory WHERE film_id = ? `, [filmId]);
    return rows[0];
}
async function getAllMovieCategories() {
    const [rows] = await pool.query(`SELECT * FROM moviecategory`);
    return rows;
}
async function insertMovieCategory(movieCategory) {
    const movie = await getCategoryByID(movieCategory.category_id);
    const category = await getMovieByID(movieCategory.film_id);

    if (!movie || !category) {
        throw new Error('movie or category does not exist');
    }

    const movieCategoryRelation = await getMovieCategoryByIDs(movieCategory.film_id,movieCategory.category_id);
    if (movieCategoryRelation ) {
        throw new Error('movie category relation already exists');
    }
    else{
        const [result] = await pool.query(
            `INSERT INTO moviecategory (film_id, category_id, last_update) VALUES (?, ?, ?)`,
            [movieCategory.film_id,movieCategory.category_id, movieCategory.last_update]
        );
        return getMovieCategoryByIDs(movieCategory.film_id,movieCategory.category_id);
    }
}
async function updateMovieCategory(filmId, categoryId, movieCategory) {

    const category = await getCategoryByID(categoryId);
    const movie = await getMovieByID(filmId);
    console.log(movie,category)
    if (!movie || !category) {
        throw new Error('movie or category does not exist');
    }

    const movieCategoryRelation = await getMovieCategoryByIDs(filmId);
    console.log(movieCategoryRelation)

    if (!movieCategoryRelation ) {
        throw new Error('movie category relation does not exists');
    }
    else{
        const [result] = await pool.query(
            `UPDATE moviecategory SET film_id = ?,category_id = ?,last_update = ? WHERE film_id = ? `,
            [movieCategory.film_id,movieCategory.category_id, movieCategory.last_update,filmId]
        );
        return getMovieCategoryByIDs(filmId);
    }
}
async function deleteMovieCategory(filmId, categoryId) {
    const [result] = await pool.query(`DELETE FROM moviecategory WHERE film_id = ? AND category_id = ?`, [filmId, categoryId]);
    return result.affectedRows > 0;
}
async function deleteMovieCategoryByFilmId(filmId) {
    const [result] = await pool.query(`DELETE FROM moviecategory WHERE film_id = ? `, [filmId]);
    return result.affectedRows > 0;
}


//more interesting function for the filtering options
async function getAllMovieYear(year){
    const [rows] = await pool.query(`SELECT * FROM movie WHERE release_year = ?`,[year]);
    if (rows.length>0)
        return rows;
    throw new Error(`No movies found for  ${year}`);

}
async function getMoviesByCategory(categoryID) {
    const movies = await pool.query(`
    SELECT m.* 
    FROM movie m 
    INNER JOIN moviecategory mc ON m.film_id = mc.film_id 
    WHERE mc.category_id = ?
`, [categoryID]);

    console.log('Movies:', movies[0]); // רק התוצאות עצמן

    if (movies[0].length > 0) {
        return movies[0]; // מחזירים את כל הסרטים שמצאנו
    }

    throw new Error(`No movies found for category ID ${categoryID}`);
}
async function getMovieByRating(rating) {
     const [rows] = await pool.query(`SELECT * FROM movie WHERE rating = ?`,[rating]);


    if (rows.length > 0) {
        return rows;
    }

    throw new Error(`No movies found for rating ${rating}`);
}
async function getPaymentByCustomer(customerID) {
    const [rows] = await pool.query(`SELECT * FROM payment WHERE customer_id = ?`,[customerID]);
    if (rows.length > 0) {
        return rows;
    }

    throw new Error(`No payments were found for customer ${customerID}`);
}
async function getRentalByCustomer(customerID) {
    const [rows] = await pool.query(`SELECT * FROM rental WHERE customer_id = ?`,[customerID]);
    if (rows.length > 0) {
        return rows;
    }

    throw new Error(`No rental were found for customer ${customerID}`);
}
async function getCategoriesOfMovie(movieID) {
    // בדיקה אם הסרט קיים
    const movieExist = await getMovieByID(movieID);
    if (!movieExist) {
        throw new Error('Movie does not exist');
    }

    const [rows] = await pool.query(`
        SELECT c.*
        FROM category c
        INNER JOIN moviecategory mc ON c.category_id = mc.category_id
        WHERE mc.film_id = ?
    `, [movieID]);

    if (rows.length > 0) {
        return rows;
    }

    throw new Error(`No categories were found for movie ${movieID}`);
}
async function getActorsOfMovie(movieID) {
    // בדיקה אם הסרט קיים
    const movieExist = await getMovieByID(movieID);
    if (!movieExist) {
        throw new Error('Movie does not exist');
    }

    const [rows] = await pool.query(`
        SELECT c.*
        FROM actor c
        INNER JOIN movieactor mc ON c.actor_id = mc.actor_id
        WHERE mc.film_id = ?
    `, [movieID]);

    if (rows.length > 0) {
        return rows;
    }

    throw new Error(`No actors were found for movie ${movieID}`);
}
async function getMoviesOfActor(actorID) {
    const actorExist = await getActorByID(actorID);
    if (!actorExist) {
        throw new Error('Actor does not exist');
    }

    const [rows] = await pool.query(`
        SELECT m.*
        FROM movie m
        INNER JOIN movieactor ma ON m.film_id = ma.film_id
        WHERE ma.actor_id = ?
    `, [actorID]);

    if (rows.length > 0) {
        return rows;
    }

    throw new Error(`No movies were found for actor ${actorID}`);
}
async function getAllActiveCustomers() {
    const [rows] = await pool.query(`SELECT * FROM customer WHERE active = 1`);
    console.log(rows)
    if (rows.length > 0) {
        return rows;
    }

    throw new Error(`No active customers were found`);
}

async function getFilteredMoviesByClientRequest(userFilter) {
    let query = `
        SELECT m.film_id, m.title, m.description, m.release_year, m.length, m.rating, m.movie_image, m.movie_video
        FROM movie m
        LEFT JOIN moviecategory mc ON m.film_id = mc.film_id
        LEFT JOIN category c ON mc.category_id = c.category_id
        WHERE 1=1
    `;
    let DataUser = [];

    if (userFilter.name !=='') {
        query += " AND c.name = ?";
        DataUser.push(userFilter.name);
    }
    if (userFilter.release_year!=='') {
        query += " AND m.release_year = ?";
        DataUser.push(userFilter.release_year);
    }
    if (userFilter.rating !=='') {
        query += " AND m.rating = ?";
        DataUser.push(userFilter.rating);
    }
    if (userFilter.length !=='') {
        query += " AND m.length = ?";
        DataUser.push(userFilter.length);
    }

    console.log("SQL Query:", query);
    console.log("DataUser:", DataUser);

    const [rows] = await pool.query(query, DataUser);
    return {movies:rows,total:rows[0]?.total};
}



module.exports = {
    getCustomerByID,
    getAllCustomers,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerByEmail,
    getMovieByID,
    getAllMovies,
    getTotalMovies,
    insertMovie,
    updateMovie,
    deleteMovie,
    getMoviesByTitle,
    updateMovieByTitle,
    getActorByID,
    getAllActors,
    insertActor,
    updateActor,
    deleteActor,
    getPaymentByID,
    getAllPayments,
    insertPayment,
    updatePayment,
    deletePayment,
    getAllHistory,
    insertHistory,
    updateHistory,
    deleteHistory,
    getCityByID,
    getAllCities,
    insertCity,
    updateCity,
    deleteCity,
    getCountryByID,
    getAllCountries,
    insertCountry,
    updateCountry,
    deleteCountry,
    getAdminByID,
    getAdminByMail,
    getAllAdmins,
    insertAdmin,
    updateAdmin,
    deleteAdmin,
    getCategoryByID,
    getAllCategories,
    insertCategory,
    updateCategory,
    deleteCategory,
    getMovieActorByIDs,
    getAllMovieActors,
    insertMovieActor,
    updateMovieActor,
    deleteMovieActor,
    getMovieCategoryByIDs,
    getAllMovieCategories,
    insertMovieCategory,
    updateMovieCategory,
    deleteMovieCategory,
    getMoviesByCategory,
    getAllMovieYear,
    getMovieByRating,
    getPaymentByCustomer,
    getRentalByCustomer,
    getCategoriesOfMovie,
    getActorsOfMovie,
    getMoviesOfActor,
    getAllActiveCustomers,
    deleteMovieActorByFilmId,
    deleteMovieCategoryByFilmId,
    getTotalMoviesByTitle,
    getFilteredMoviesByClientRequest,
};
