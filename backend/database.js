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
    const [rows] = await pool.query(`SELECT * FROM customer WHERE active=1`);//רק לקוחות אקטיביים
    return rows;
}
async function insertCustomer(customer) {
    const [result] = await pool.query(
        `INSERT INTO customer (first_name, last_name, email, active, create_date, last_update, password) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [customer.firstName, customer.lastName, customer.email, customer.active, customer.createDate, customer.lastUpdate, customer.password]
    );
    return getCustomerByID(result.insertId);
}
async function updateCustomer(id, customer) {
    const [result] = await pool.query(
        `UPDATE customer SET first_name = ?, last_name = ?, email = ?, active = ?, last_update = ?, password = ? WHERE customer_id = ?`,
        [customer.firstName, customer.lastName, customer.email, customer.active, customer.lastUpdate, customer.password, id]
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
async function getAllMovies() {
    const [rows] = await pool.query(`SELECT * FROM movie`);
    return rows;
}
async function insertMovie(movie) {
    const [result] = await pool.query(
        `INSERT INTO movie (title, description, release_year, language_id, rental_rate, length, rating, last_update, movie_image, movie_video) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [movie.title, movie.description, movie.releaseYear, movie.languageId, movie.rentalRate, movie.length, movie.rating, movie.lastUpdate, movie.movie_image, movie.movie_video]
    );
    return getMovieByID(result.insertId);
}
async function updateMovie(id, movie) {
    const [result] = await pool.query(
        `UPDATE movie SET title = ?, description = ?, release_year = ?, language_id = ?, rental_rate = ?, length = ?, rating = ?, last_update = ?, movie_image = ?, movie_video = ? WHERE film_id = ?`,
        [movie.title, movie.description, movie.releaseYear, movie.languageId, movie.rentalRate, movie.length, movie.rating, movie.lastUpdate, movie.movie_image, movie.movie_video, id]
    );
    return getMovieByID(id);
}
async function deleteMovie(id) {
    const [result] = await pool.query(`DELETE FROM movie WHERE film_id = ?`, [id]);
    return result.affectedRows > 0;
}
async function getMoviesByTitle(title) {
    const [rows] = await pool.query(`SELECT * FROM movie WHERE title LIKE ?`, [`%${title}%`]);
    return rows;
}
async function updateMovieByTitle(title, updatedMovie) {
    const [result] = await pool.query(
        `UPDATE movie SET description = ?, release_year = ?, language_id = ?, rental_rate = ?, length = ?, rating = ?, last_update = ?, movie_image = ?, movie_video = ? WHERE title = ?`,
        [
            updatedMovie.description,
            updatedMovie.releaseYear,
            updatedMovie.languageId,
            updatedMovie.rentalRate,
            updatedMovie.length,
            updatedMovie.rating,
            updatedMovie.lastUpdate,
            updatedMovie.movie_image,
            updatedMovie.movie_video,
            title
        ]
    );
    return result.affectedRows > 0;
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
        [actor.firstName, actor.lastName]
    );
    return getActorByID(result.insertId);
}
async function updateActor(id, actor) {
    const [result] = await pool.query(
        `UPDATE actor SET first_name = ?, last_name = ? WHERE actor_id = ?`,
        [actor.firstName, actor.lastName, id]
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
        [payment.customerId, payment.rentalId, payment.amount, payment.paymentDate, payment.lastUpdate]
    );
    return getPaymentByID(result.insertId);
}
async function updatePayment(id, payment) {
    const [result] = await pool.query(
        `UPDATE payment SET customer_id = ?, rental_id = ?, amount = ?, payment_date = ?, last_update = ? WHERE payment_id = ?`,
        [payment.customerId, payment.rentalId, payment.amount, payment.paymentDate, payment.lastUpdate, id]
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
        [rental.rentalDate, rental.inventoryId, rental.customerId, rental.returnDate, rental.lastUpdate]
    );
    return getRentalByID(result.insertId);
}
async function updateRental(id, rental) {
    const [result] = await pool.query(
        `UPDATE rental SET rental_date = ?, inventory_id = ?, customer_id = ?, return_date = ?, last_update = ? WHERE rental_id = ?`,
        [rental.rentalDate, rental.inventoryId, rental.customerId, rental.returnDate, rental.lastUpdate, id]
    );
    return getRentalByID(id);
}
async function deleteRental(id) {
    const [result] = await pool.query(`DELETE FROM rental WHERE rental_id = ?`, [id]);
    return result.affectedRows > 0;
}

// CRUD operations for the "movie_text" table
async function getMovieTextByID(id) {
    const [rows] = await pool.query(`SELECT * FROM movie_text WHERE film_id = ?`, [id]);
    return rows[0];
}
async function getAllMovieTexts() {
    const [rows] = await pool.query(`SELECT * FROM movie_text`);
    return rows;
}
async function insertMovieText(movieText) {
    const [result] = await pool.query(
        `INSERT INTO movie_text (film_id, title, description) VALUES (?, ?, ?)`,
        [movieText.filmId, movieText.title, movieText.description]
    );
    return getMovieTextByID(result.insertId);
}
async function updateMovieText(id, movieText) {
    const [result] = await pool.query(
        `UPDATE movie_text SET title = ?, description = ? WHERE film_id = ?`,
        [movieText.title, movieText.description, id]
    );
    return getMovieTextByID(id);
}
async function deleteMovieText(id) {
    const [result] = await pool.query(`DELETE FROM movie_text WHERE film_id = ?`, [id]);
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
        [city.name, city.countryId, city.lastUpdate]
    );
    return getCityByID(result.insertId);
}
async function updateCity(id, city) {
    const [result] = await pool.query(
        `UPDATE city SET city = ?, country_id = ?, last_update = ? WHERE city_id = ?`,
        [city.name, city.countryId, city.lastUpdate, id]
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
        [country.name, country.lastUpdate]
    );
    return getCountryByID(result.insertId);
}
async function updateCountry(id, country) {
    const [result] = await pool.query(
        `UPDATE country SET country = ?, last_update = ? WHERE country_id = ?`,
        [country.name, country.lastUpdate, id]
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
        [language.name, language.lastUpdate]
    );
    return getLanguageByID(result.insertId);
}
async function updateLanguage(id, language) {
    const [result] = await pool.query(
        `UPDATE language SET name = ?, last_update = ? WHERE language_id = ?`,
        [language.name, language.lastUpdate, id]
    );
    return getLanguageByID(id);
}
async function deleteLanguage(id) {
    const [result] = await pool.query(`DELETE FROM language WHERE language_id = ?`, [id]);
    return result.affectedRows > 0;
}

// CRUD operations for the "admin" table
async function getAdminByID(id) {
    const [rows] = await pool.query(`SELECT * FROM admin WHERE staff_id = ?`, [id]);
    return rows[0];
}
async function getAllAdmins() {
    const [rows] = await pool.query(`SELECT * FROM admin`);
    return rows;
}
async function insertAdmin(admin) {
    const [result] = await pool.query(
        `INSERT INTO admin (first_name, last_name, email, store_id, active, username, password, last_update) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [admin.firstName, admin.lastName, admin.email, admin.storeId, admin.active, admin.username, admin.password, admin.lastUpdate]
    );
    return getAdminByID(result.insertId);
}
async function updateAdmin(id, admin) {
    const [result] = await pool.query(
        `UPDATE admin SET first_name = ?, last_name = ?, email = ?, store_id = ?, active = ?, username = ?, password = ?, last_update = ? WHERE staff_id = ?`,
        [admin.firstName, admin.lastName, admin.email, admin.storeId, admin.active, admin.username, admin.password, admin.lastUpdate, id]
    );
    return getAdminByID(id);
}
async function deleteAdmin(id) {
    const [result] = await pool.query(`DELETE FROM admin WHERE staff_id = ?`, [id]);
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
        [category.name, category.lastUpdate]
    );
    return getCategoryByID(result.insertId);
}
async function updateCategory(id, category) {
    const [result] = await pool.query(
        `UPDATE category SET name = ?, last_update = ? WHERE category_id = ?`,
        [category.name, category.lastUpdate, id]
    );
    return getCategoryByID(id);
}
async function deleteCategory(id) {
    const [result] = await pool.query(`DELETE FROM category WHERE category_id = ?`, [id]);
    return result.affectedRows > 0;
}

// CRUD operations for the "movie-actor" table
async function getMovieActorByIDs(actorId, filmId) {
    const [rows] = await pool.query(`SELECT * FROM movie_actor WHERE actor_id = ? AND film_id = ?`, [actorId, filmId]);
    return rows[0];
}
async function getAllMovieActors() {
    const [rows] = await pool.query(`SELECT * FROM movie_actor`);
    return rows;
}
async function insertMovieActor(movieActor) {
    const [result] = await pool.query(
        `INSERT INTO movie_actor (actor_id, film_id, last_update) VALUES (?, ?, ?)`,
        [movieActor.actorId, movieActor.filmId, movieActor.lastUpdate]
    );
    return getMovieActorByIDs(movieActor.actorId, movieActor.filmId);
}
async function updateMovieActor(actorId, filmId, movieActor) {
    const [result] = await pool.query(
        `UPDATE movie_actor SET last_update = ? WHERE actor_id = ? AND film_id = ?`,
        [movieActor.lastUpdate, actorId, filmId]
    );
    return getMovieActorByIDs(actorId, filmId);
}
async function deleteMovieActor(actorId, filmId) {
    const [result] = await pool.query(`DELETE FROM movie_actor WHERE actor_id = ? AND film_id = ?`, [actorId, filmId]);
    return result.affectedRows > 0;
}

// CRUD operations for the "movie-category" table
async function getMovieCategoryByIDs(filmId, categoryId) {
    const [rows] = await pool.query(`SELECT * FROM movie_category WHERE film_id = ? AND category_id = ?`, [filmId, categoryId]);
    return rows[0];
}
async function getAllMovieCategories() {
    const [rows] = await pool.query(`SELECT * FROM movie_category`);
    return rows;
}
async function insertMovieCategory(movieCategory) {
    const [result] = await pool.query(
        `INSERT INTO movie_category (film_id, category_id, last_update) VALUES (?, ?, ?)`,
        [movieCategory.filmId, movieCategory.categoryId, movieCategory.lastUpdate]
    );
    return getMovieCategoryByIDs(movieCategory.filmId, movieCategory.categoryId);
}
async function updateMovieCategory(filmId, categoryId, movieCategory) {
    const [result] = await pool.query(
        `UPDATE movie_category SET last_update = ? WHERE film_id = ? AND category_id = ?`,
        [movieCategory.lastUpdate, filmId, categoryId]
    );
    return getMovieCategoryByIDs(filmId, categoryId);
}
async function deleteMovieCategory(filmId, categoryId) {
    const [result] = await pool.query(`DELETE FROM movie_category WHERE film_id = ? AND category_id = ?`, [filmId, categoryId]);
    return result.affectedRows > 0;
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
    deleteMovieCategory
};
