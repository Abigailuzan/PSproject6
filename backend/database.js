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
    const [rows] = await pool.query(`SELECT * FROM customer WHERE customer_id = ?`, [id]);
    return rows[0];
}
async function getAllCustomers() {
    const [rows] = await pool.query(`SELECT * FROM customer`);
    return rows;
}
async function insertCustomer(customer) {
    if (customer.email.includes('staff'))
        throw new Error('email was problematic');
    else{
        const [result] = await pool.query(
            `INSERT INTO customer (first_name, last_name, email, active, create_date, last_update, password) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [customer.first_name, customer.last_name, customer.email, customer.active, customer.create_date, customer.last_update, customer.password]
        );
        return getCustomerByID(result.insertId);
    }
}
async function updateCustomer(id, customer) {
    const [result] = await pool.query(
        `UPDATE customer SET first_name = ?, last_name = ?, email = ?, active = ?, last_update = ?, password = ? WHERE customer_id = ?`,
        [customer.first_name, customer.last_name, customer.email, customer.active, customer.last_update, customer.password, id]
    );
    return getCustomerByID(id);
}
async function deleteCustomer(id) {
    const [result] = await pool.query(`DELETE FROM customer WHERE customer_id = ?`, [id]);
    return result.affectedRows > 0;
}
async function getCustomerByEmail(email) {
    const [rows] = await pool.query(`SELECT * FROM customer WHERE email = ?`, [email]);
    return rows[0] || undefined;
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
async function getTotalMovies() {
    const [[{ total }]] = await pool.query(`SELECT COUNT(*) as total FROM movie`);
    return total;
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
async function getMoviesByTitle(title) {
    const [rows] = await pool.query(`SELECT * FROM movie WHERE title LIKE ?`, [`%${title}%`]);
    return rows[0];
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

// CRUD operations for the "rental" table
async function getRentalByID(id) {
    const [rows] = await pool.query(`SELECT * FROM rental WHERE rental_id = ?`, [id]);
    return rows[0];
}
async function getAllRentals() {
    const [rows] = await pool.query(`SELECT * FROM rental`);
    return rows;
}
async function insertRental(rental) {
    const [result] = await pool.query(
        `INSERT INTO rental (rental_date, inventory_id, customer_id, return_date, last_update) VALUES (?, ?, ?, ?, ?)`,
        [rental.rental_date, rental.inventory_id, rental.customer_id, rental.return_date, rental.last_update]
    );
    return getRentalByID(result.insertId);
}
async function updateRental(id, rental) {
    const [result] = await pool.query(
        `UPDATE rental SET rental_date = ?, inventory_id = ?, customer_id = ?, return_date = ?, last_update = ? WHERE rental_id = ?`,
        [rental.rental_date, rental.inventory_id, rental.customer_id, rental.return_date, rental.last_update, id]
    );
    return getRentalByID(id);
}
async function deleteRental(id) {
    const [result] = await pool.query(`DELETE FROM rental WHERE rental_id = ?`, [id]);
    return result.affectedRows > 0;
}

// CRUD operations for the "movie_text" table
async function getMovieTextByID(id) {
    const [rows] = await pool.query(`SELECT * FROM movieText WHERE film_id = ?`, [id]);
    return rows[0];
}
async function getAllMovieTexts() {
    const [rows] = await pool.query(`SELECT * FROM movieText`);
    return rows;
}
async function insertMovieText(movieText) {
    const [result] = await pool.query(
        `INSERT INTO movieText ( title, description) VALUES (?, ?)`,
        [ movieText.title, movieText.description]
    );
    return getMovieTextByID(result.insertId);
}
async function updateMovieText(id, movieText) {
    const [result] = await pool.query(
        `UPDATE movieText SET title = ?, description = ? WHERE film_id = ?`,
        [movieText.title, movieText.description, id]
    );
    return getMovieTextByID(id);
}
async function deleteMovieText(id) {
    const [result] = await pool.query(`DELETE FROM movieText WHERE film_id = ?`, [id]);
    return result.affectedRows > 0;
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

// CRUD operations for the "language" table
async function getLanguageByID(id) {
    const [rows] = await pool.query(`SELECT * FROM language WHERE language_id = ?`, [id]);
    return rows[0];
}
async function getAllLanguages() {
    const [rows] = await pool.query(`SELECT * FROM language`);
    return rows;
}
async function insertLanguage(language) {
    const [result] = await pool.query(
        `INSERT INTO language (name, last_update) VALUES (?, ?)`,
        [language.name, language.last_update]
    );
    return getLanguageByID(result.insertId);
}
async function updateLanguage(id, language) {
    const [result] = await pool.query(
        `UPDATE language SET name = ?, last_update = ? WHERE language_id = ?`,
        [language.name, language.last_update, id]
    );
    return getLanguageByID(id);
}
async function deleteLanguage(id) {
    const [result] = await pool.query(`DELETE FROM language WHERE language_id = ?`, [id]);
    return result.affectedRows > 0;
}

// CRUD operations for the "admin" table
async function getAdminByID(id) {
    const [rows] = await pool.query(`SELECT * FROM admin WHERE admin_id = ?`, [id]);
    return rows[0];
}
async function getAllAdmins() {
    const [rows] = await pool.query(`SELECT * FROM admin`);
    return rows;
}
async function insertAdmin(admin) {
    if (!admin.email.includes('staff'))
        throw new Error( "admins must includes staff in mail");
    else {
        const [result] = await pool.query(
            `INSERT INTO admin (first_name, last_name, email, active, username, password, last_update) VALUES ( ?, ?, ?, ?, ?, ?, ?)`,
            [admin.first_name, admin.last_name, admin.email, admin.active, admin.username, admin.password, admin.last_update]
        );
        return getAdminByID(result.insertId);
    }
}
async function updateAdmin(id, admin) {
    if (!admin.email.includes('staff'))
        throw "admins must includes staff in mail";
    else{
        const [result] = await pool.query(
            `UPDATE admin SET first_name = ?, last_name = ?, email = ?, active = ?, username = ?, password = ?, last_update = ? WHERE admin_id = ?`,
            [admin.first_name, admin.last_name, admin.email,  admin.active, admin.username,admin.password, admin.last_update, id]
        );
        return getAdminByID(id);
    }
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

// CRUD operations for the "movie-category" table
async function getMovieCategoryByIDs(filmId, categoryId) {
    const [rows] = await pool.query(`SELECT * FROM moviecategory WHERE film_id = ? AND category_id = ?`, [filmId, categoryId]);
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

    const movie = await getCategoryByID(categoryId);
    const category = await getMovieByID(filmId);

    if (!movie || !category) {
        throw new Error('movie or category does not exist');
    }

    const movieCategoryRelation = await getMovieCategoryByIDs(filmId,categoryId);
    if (!movieCategoryRelation ) {
        throw new Error('movie category relation does not exists');
    }
    else{
        const [result] = await pool.query(
            `UPDATE moviecategory SET film_id = ?,category_id = ?,last_update = ? WHERE film_id = ? AND category_id = ?`,
            [movieCategory.film_id,movieCategory.category_id, movieCategory.last_update,filmId,categoryId]
        );
        return getMovieCategoryByIDs(movieCategory.film_id, movieCategory.category_id);
    }
}
async function deleteMovieCategory(filmId, categoryId) {
    const [result] = await pool.query(`DELETE FROM moviecategory WHERE film_id = ? AND category_id = ?`, [filmId, categoryId]);
    return result.affectedRows > 0;
}


//more interesting function
async function getAllMovieYear(year){
    const [rows] = await pool.query(`SELECT * FROM movie WHERE release_year = ?`,[year]);
    if (rows.length>0)
        return rows;
    throw new Error(`No movies found for  ${year}`);

}
async function getMoviesByCategory(categoryID) {
    const [movies] = await pool.query(`
        SELECT m.*
        FROM movie m
        INNER JOIN moviecategory mc ON m.film_id = mc.film_id
        WHERE mc.category_id = ?
    `, [categoryID]);

    if (movies.length > 0) {
        return movies; // מחזירים את כל הסרטים שמצאנו
    }

    throw new Error(`No movies found for category ID ${categoryID}`);
}
async function getMovieByRating(rating) {
     const [rows] = await pool.query(`SELECT * FROM movie WHERE rating = ?`,[rating]);


    if (rows.length > 0) {
        return rows; // מחזירים את כל הסרטים שמצאנו
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

    // שליפת הקטגוריות של הסרט
    const [rows] = await pool.query(`
        SELECT c.*
        FROM category c
        INNER JOIN moviecategory mc ON c.category_id = mc.category_id
        WHERE mc.film_id = ?
    `, [movieID]);

    // בדיקה אם נמצאו קטגוריות
    if (rows.length > 0) {
        return rows; // מחזירים את הקטגוריות
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
    // בדיקה אם השחקן קיים
    const actorExist = await getActorByID(actorID);
    if (!actorExist) {
        throw new Error('Actor does not exist');
    }

    // שליפת כל הסרטים בהם השחקן שיחק
    const [rows] = await pool.query(`
        SELECT m.*
        FROM movie m
        INNER JOIN movieactor ma ON m.film_id = ma.film_id
        WHERE ma.actor_id = ?
    `, [actorID]);

    // בדיקה אם נמצאו סרטים
    if (rows.length > 0) {
        return rows;
    }

    throw new Error(`No movies were found for actor ${actorID}`);
}
async function getAllActiveCustomers() {
    const [rows] = await pool.query(`SELECT * FROM customer WHERE active = 1`);
    console.log(rows)
    if (rows.length > 0) {
        return rows; // מחזירים את הלקוחות האקטיביים
    }

    throw new Error(`No active customers were found`);
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
    getRentalByID,
    getAllRentals,
    insertRental,
    updateRental,
    deleteRental,
    getMovieTextByID,
    getAllMovieTexts,
    insertMovieText,
    updateMovieText,
    deleteMovieText,
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
    getLanguageByID,
    getAllLanguages,
    insertLanguage,
    updateLanguage,
    deleteLanguage,
    getAdminByID,
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
    getAllActiveCustomers
};
