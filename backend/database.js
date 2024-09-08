const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'au270101',
    database: 'fullstack6-db',
    port: '3306'
}).promise();


// CRUD operations for the "customer" table
export async function getCustomerByID(id) {
    const [rows] = await pool.query(`SELECT * FROM customer WHERE customer_id = ?`, [id]);
    return rows[0];
}
export async function getAllCustomers() {
    const [rows] = await pool.query(`SELECT * FROM customer`);
    return rows;
}
export async function insertCustomer(customer) {
    const [result] = await pool.query(
        `INSERT INTO customer (first_name, last_name, email, active, create_date, last_update, password) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [customer.firstName, customer.lastName, customer.email, customer.active, customer.createDate, customer.lastUpdate, customer.password]
    );
    return getCustomerByID(result.insertId);
}
export async function updateCustomer(id, customer) {
    const [result] = await pool.query(
        `UPDATE customer SET first_name = ?, last_name = ?, email = ?, active = ?, last_update = ?, password = ? WHERE customer_id = ?`,
        [customer.firstName, customer.lastName, customer.email, customer.active, customer.lastUpdate, customer.password, id]
    );
    return getCustomerByID(id);
}
export async function deleteCustomer(id) {
    const [result] = await pool.query(`DELETE FROM customer WHERE customer_id = ?`, [id]);
    return result.affectedRows > 0;
}
export async function getCustomerByEmailAndPassword(email) {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM customer WHERE email = ? `,
            [email]
        );

        if (rows.length > 0) {
            console.log('Customer found:', rows[0]);
            return rows[0]; // מחזיר את הלקוח הראשון שנמצא
        } else {
            console.log('No customer found with the provided email and password.');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching the customer:', error);
        return null;
    }
}


// CRUD operations for the "movie" table
export async function getMovieByID(id) {
    const [rows] = await pool.query(`SELECT * FROM movie WHERE film_id = ?`, [id]);
    return rows[0];
}
export async function getAllMovies() {
    const [rows] = await pool.query(`SELECT * FROM movie`);
    return rows;
}
export async function insertMovie(movie) {
    const [result] = await pool.query(
        `INSERT INTO movie (title, description, release_year, language_id, rental_rate, length, rating, last_update) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
        [movie.title, movie.description, movie.releaseYear, movie.languageId, movie.rentalRate, movie.length, movie.rating, movie.lastUpdate,movie.movie_image,movie.movie_video]
    );
    return getMovieByID(result.insertId);
}
export async function updateMovie(id, movie) {
    const [result] = await pool.query(
        `UPDATE movie SET title = ?, description = ?, release_year = ?, language_id = ?, rental_rate = ?, length = ?, rating = ?, last_update = ? WHERE film_id = ?`,
        [movie.title, movie.description, movie.releaseYear, movie.languageId, movie.rentalRate, movie.length, movie.rating, movie.lastUpdate, id]
    );
    return getMovieByID(id);
}
export async function deleteMovie(id) {
    const [result] = await pool.query(`DELETE FROM movie WHERE film_id = ?`, [id]);
    return result.affectedRows > 0;
}
export async function getMoviesByTitle(title) {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM movie WHERE title LIKE ?`,
            [`%${title}%`] // חיפוש סרטים שמכילים את המחרוזת המוזנת
        );
        return rows;
    } catch (error) {
        console.error('An error occurred while fetching the movies:', error);
        return [];
    }
}
export async function updateMovieByTitle(title, updatedMovie) {
    try {
        const [result] = await pool.query(
            `UPDATE movie 
             SET description = ?, release_year = ?, language_id = ?, rental_rate = ?, length = ?, rating = ?, last_update = ? 
             , movie_image=? ,movie_video=?
             WHERE title = ?`,
            [
                updatedMovie.description,
                updatedMovie.releaseYear,
                updatedMovie.languageId,
                updatedMovie.rentalRate,
                updatedMovie.length,
                updatedMovie.rating,
                updatedMovie.lastUpdate,
                updatedMovie.movie_image,
                updatedMovie.movie_video
            ]
        );
        if (result.affectedRows > 0) {
            console.log(`Movie titled '${title}' was successfully updated.`);
            return true;
        } else {
            console.log(`No movie found with the title '${title}'.`);
            return false;
        }
    } catch (error) {
        console.error('An error occurred while updating the movie:', error);
        return false;
    }
}



// CRUD operations for the "actor" table
export async function getActorByID(id) {
    const [rows] = await pool.query(`SELECT * FROM actor WHERE actor_id = ?`, [id]);
    return rows[0];
}
export async function getAllActors() {
    const [rows] = await pool.query(`SELECT * FROM actor`);
    return rows;
}
export async function insertActor(actor) {
    const [result] = await pool.query(
        `INSERT INTO actor (first_name, last_name) VALUES (?, ?)`,
        [actor.firstName, actor.lastName]
    );
    return getActorByID(result.insertId);
}
export async function updateActor(id, actor) {
    const [result] = await pool.query(
        `UPDATE actor SET first_name = ?, last_name = ? WHERE actor_id = ?`,
        [actor.firstName, actor.lastName, id]
    );
    return getActorByID(id);
}
export async function deleteActor(id) {
    const [result] = await pool.query(`DELETE FROM actor WHERE actor_id = ?`, [id]);
    return result.affectedRows > 0;
}
export async function getActorByName(firstName, lastName) {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM actor WHERE first_name = ? AND last_name = ?`,
            [firstName, lastName]
        );

        if (rows.length > 0) {
            console.log('Actor found:', rows[0]);
            return rows[0]; // מחזיר את השחקן הראשון שנמצא
        } else {
            console.log('No actor found with the provided name.');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching the actor:', error);
        return null;
    }
}


// CRUD operations for the "payment" table
export async function getPaymentByID(id) {
    const [rows] = await pool.query(`SELECT * FROM payment WHERE payment_id = ?`, [id]);
    return rows[0];
}
export async function getAllPayments() {
    const [rows] = await pool.query(`SELECT * FROM payment`);
    return rows;
}
export async function insertPayment(payment) {
    const [result] = await pool.query(
        `INSERT INTO payment (customer_id, rental_id, amount, payment_date, last_update) VALUES (?, ?, ?, ?, ?)`,
        [payment.customerId, payment.rentalId, payment.amount, payment.paymentDate, payment.lastUpdate]
    );
    return getPaymentByID(result.insertId);
}
export async function updatePayment(id, payment) {
    const [result] = await pool.query(
        `UPDATE payment SET customer_id = ?, rental_id = ?, amount = ?, payment_date = ?, last_update = ? WHERE payment_id = ?`,
        [payment.customerId, payment.rentalId, payment.amount, payment.paymentDate, payment.lastUpdate, id]
    );
    return getPaymentByID(id);
}
export async function deletePayment(id) {
    const [result] = await pool.query(`DELETE FROM payment WHERE payment_id = ?`, [id]);
    return result.affectedRows > 0;
}


// CRUD operations for the "rental" table
export async function getRentalByID(id) {
    const [rows] = await pool.query(`SELECT * FROM rental WHERE rental_id = ?`, [id]);
    return rows[0];
}
export async function getAllRentals() {
    const [rows] = await pool.query(`SELECT * FROM rental`);
    return rows;
}
export async function insertRental(rental) {
    const [result] = await pool.query(
        `INSERT INTO rental (rental_date, inventory_id, customer_id, return_date, last_update) VALUES (?, ?, ?, ?, ?)`,
        [rental.rentalDate, rental.inventoryId, rental.customerId, rental.returnDate, rental.lastUpdate]
    );
    return getRentalByID(result.insertId);
}
export async function updateRental(id, rental) {
    const [result] = await pool.query(
        `UPDATE rental SET rental_date = ?, inventory_id = ?, customer_id = ?, return_date = ?, last_update = ? WHERE rental_id = ?`,
        [rental.rentalDate, rental.inventoryId, rental.customerId, rental.returnDate, rental.lastUpdate, id]
    );
    return getRentalByID(id);
}
export async function deleteRental(id) {
    const [result] = await pool.query(`DELETE FROM rental WHERE rental_id = ?`, [id]);
    return result.affectedRows > 0;
}


// CRUD operations for the "movie_text" table
export async function getMovieTextByID(id) {
    const [rows] = await pool.query(`SELECT * FROM movie_text WHERE film_id = ?`, [id]);
    return rows[0];
}
export async function getAllMovieTexts() {
    const [rows] = await pool.query(`SELECT * FROM movie_text`);
    return rows;
}
export async function insertMovieText(movieText) {
    const [result] = await pool.query(
        `INSERT INTO movie_text (film_id, title, description) VALUES (?, ?, ?)`,
        [movieText.filmId, movieText.title, movieText.description]
    );
    return getMovieTextByID(result.insertId);
}
export async function updateMovieText(id, movieText) {
    const [result] = await pool.query(
        `UPDATE movie_text SET title = ?, description = ? WHERE film_id = ?`,
        [movieText.title, movieText.description, id]
    );
    return getMovieTextByID(id);
}
export async function deleteMovieText(id) {
    const [result] = await pool.query(`DELETE FROM movie_text WHERE film_id = ?`, [id]);
    return result.affectedRows > 0;
}


// CRUD operations for the "city" table
export async function getCityByID(id) {
    const [rows] = await pool.query(`SELECT * FROM city WHERE city_id = ?`, [id]);
    return rows[0];
}
export async function getAllCities() {
    const [rows] = await pool.query(`SELECT * FROM city`);
    return rows;
}
export async function insertCity(city) {
    const [result] = await pool.query(
        `INSERT INTO city (city, country_id, last_update) VALUES (?, ?, ?)`,
        [city.name, city.countryId, city.lastUpdate]
    );
    return getCityByID(result.insertId);
}
export async function updateCity(id, city) {
    const [result] = await pool.query(
        `UPDATE city SET city = ?, country_id = ?, last_update = ? WHERE city_id = ?`,
        [city.name, city.countryId, city.lastUpdate, id]
    );
    return getCityByID(id);
}
export async function deleteCity(id) {
    const [result] = await pool.query(`DELETE FROM city WHERE city_id = ?`, [id]);
    return result.affectedRows > 0;
}
export async function getCityByName(cityName) {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM city WHERE city = ?`,
            [cityName]
        );

        if (rows.length > 0) {
            console.log('City found:', rows[0]);
            return rows[0]; // מחזיר את העיר הראשונה שנמצאה
        } else {
            console.log('No city found with the provided name.');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching the city:', error);
        return null;
    }
}


// CRUD operations for the "country" table
export async function getCountryByID(id) {
    const [rows] = await pool.query(`SELECT * FROM country WHERE country_id = ?`, [id]);
    return rows[0];
}
export async function getAllCountries() {
    const [rows] = await pool.query(`SELECT * FROM country`);
    return rows;
}
export async function insertCountry(country) {
    const [result] = await pool.query(
        `INSERT INTO country (country, last_update) VALUES (?, ?)`,
        [country.name, country.lastUpdate]
    );
    return getCountryByID(result.insertId);
}
export async function updateCountry(id, country) {
    const [result] = await pool.query(
        `UPDATE country SET country = ?, last_update = ? WHERE country_id = ?`,
        [country.name, country.lastUpdate, id]
    );
    return getCountryByID(id);
}
export async function deleteCountry(id) {
    const [result] = await pool.query(`DELETE FROM country WHERE country_id = ?`, [id]);
    return result.affectedRows > 0;
}
export async function getCountryByName(countryName) {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM country WHERE country = ?`,
            [countryName]
        );

        if (rows.length > 0) {
            console.log('Country found:', rows[0]);
            return rows[0]; // מחזיר את המדינה הראשונה שנמצאה
        } else {
            console.log('No country found with the provided name.');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching the country:', error);
        return null;
    }
}


// CRUD operations for the "language" table
export async function getLanguageByID(id) {
    const [rows] = await pool.query(`SELECT * FROM language WHERE language_id = ?`, [id]);
    return rows[0];
}
export async function getAllLanguages() {
    const [rows] = await pool.query(`SELECT * FROM language`);
    return rows;
}
export async function insertLanguage(language) {
    const [result] = await pool.query(
        `INSERT INTO language (name, last_update) VALUES (?, ?)`,
        [language.name, language.lastUpdate]
    );
    return getLanguageByID(result.insertId);
}
export async function updateLanguage(id, language) {
    const [result] = await pool.query(
        `UPDATE language SET name = ?, last_update = ? WHERE language_id = ?`,
        [language.name, language.lastUpdate, id]
    );
    return getLanguageByID(id);
}
export async function deleteLanguage(id) {
    const [result] = await pool.query(`DELETE FROM language WHERE language_id = ?`, [id]);
    return result.affectedRows > 0;
}
export async function getLanguageByName(languageName) {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM language WHERE name = ?`,
            [languageName]
        );

        if (rows.length > 0) {
            console.log('Language found:', rows[0]);
            return rows[0]; // מחזיר את השפה הראשונה שנמצאה
        } else {
            console.log('No language found with the provided name.');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching the language:', error);
        return null;
    }
}


// CRUD operations for the "admin" table
export async function getAdminByID(id) {
    const [rows] = await pool.query(`SELECT * FROM admin WHERE staff_id = ?`, [id]);
    return rows[0];
}
export async function getAllAdmins() {
    const [rows] = await pool.query(`SELECT * FROM admin`);
    return rows;
}
export async function insertAdmin(admin) {
    const [result] = await pool.query(
        `INSERT INTO admin (first_name, last_name, email, store_id, active, username, password, last_update) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [admin.firstName, admin.lastName, admin.email, admin.storeId, admin.active, admin.username, admin.password, admin.lastUpdate]
    );
    return getAdminByID(result.insertId);
}
export async function updateAdmin(id, admin) {
    const [result] = await pool.query(
        `UPDATE admin SET first_name = ?, last_name = ?, email = ?, store_id = ?, active = ?, username = ?, password = ?, last_update = ? WHERE staff_id = ?`,
        [admin.firstName, admin.lastName, admin.email, admin.storeId, admin.active, admin.username, admin.password, admin.lastUpdate, id]
    );
    return getAdminByID(id);
}
export async function deleteAdmin(id) {
    const [result] = await pool.query(`DELETE FROM admin WHERE staff_id = ?`, [id]);
    return result.affectedRows > 0;
}


// CRUD operations for the "category" table
export async function getCategoryByID(id) {
    const [rows] = await pool.query(`SELECT * FROM category WHERE category_id = ?`, [id]);
    return rows[0];
}
export async function getAllCategories() {
    const [rows] = await pool.query(`SELECT * FROM category`);
    return rows;
}
export async function insertCategory(category) {
    const [result] = await pool.query(
        `INSERT INTO category (name, last_update) VALUES (?, ?)`,
        [category.name, category.lastUpdate]
    );
    return getCategoryByID(result.insertId);
}
export async function updateCategory(id, category) {
    const [result] = await pool.query(
        `UPDATE category SET name = ?, last_update = ? WHERE category_id = ?`,
        [category.name, category.lastUpdate, id]
    );
    return getCategoryByID(id);
}
export async function deleteCategory(id) {
    const [result] = await pool.query(`DELETE FROM category WHERE category_id = ?`, [id]);
    return result.affectedRows > 0;
}
export async function getCategoryByName(categoryName) {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM category WHERE name = ?`,
            [categoryName]
        );

        if (rows.length > 0) {
            console.log('Category found:', rows[0]);
            return rows[0]; // מחזיר את הקטגוריה הראשונה שנמצאה
        } else {
            console.log('No category found with the provided name.');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching the category:', error);
        return null;
    }
}


// CRUD operations for the "movie-actor" table
export async function getMovieActorByIDs(actorId, filmId) {
    const [rows] = await pool.query(`SELECT * FROM movie_actor WHERE actor_id = ? AND film_id = ?`, [actorId, filmId]);
    return rows[0];
}
export async function getAllMovieActors() {
    const [rows] = await pool.query(`SELECT * FROM movie_actor`);
    return rows;
}
export async function insertMovieActor(movieActor) {
    const [result] = await pool.query(
        `INSERT INTO movie_actor (actor_id, film_id, last_update) VALUES (?, ?, ?)`,
        [movieActor.actorId, movieActor.filmId, movieActor.lastUpdate]
    );
    return getMovieActorByIDs(movieActor.actorId, movieActor.filmId);
}
export async function updateMovieActor(actorId, filmId, movieActor) {
    const [result] = await pool.query(
        `UPDATE movie_actor SET last_update = ? WHERE actor_id = ? AND film_id = ?`,
        [movieActor.lastUpdate, actorId, filmId]
    );
    return getMovieActorByIDs(actorId, filmId);
}
export async function deleteMovieActor(actorId, filmId) {
    const [result] = await pool.query(`DELETE FROM movie_actor WHERE actor_id = ? AND film_id = ?`, [actorId, filmId]);
    return result.affectedRows > 0;
}


// CRUD operations for the "movie-category" table
export async function getMovieCategoryByIDs(filmId, categoryId) {
    const [rows] = await pool.query(`SELECT * FROM movie_category WHERE film_id = ? AND category_id = ?`, [filmId, categoryId]);
    return rows[0];
}
export async function getAllMovieCategories() {
    const [rows] = await pool.query(`SELECT * FROM movie_category`);
    return rows;
}
export async function insertMovieCategory(movieCategory) {
    const [result] = await pool.query(
        `INSERT INTO movie_category (film_id, category_id, last_update) VALUES (?, ?, ?)`,
        [movieCategory.filmId, movieCategory.categoryId, movieCategory.lastUpdate]
    );
    return getMovieCategoryByIDs(movieCategory.filmId, movieCategory.categoryId);
}
export async function updateMovieCategory(filmId, categoryId, movieCategory) {
    const [result] = await pool.query(
        `UPDATE movie_category SET last_update = ? WHERE film_id = ? AND category_id = ?`,
        [movieCategory.lastUpdate, filmId, categoryId]
    );
    return getMovieCategoryByIDs(filmId, categoryId);
}
export async function deleteMovieCategory(filmId, categoryId) {
    const [result] = await pool.query(`DELETE FROM movie_category WHERE film_id = ? AND category_id = ?`, [filmId, categoryId]);
    return result.affectedRows > 0;
}


//חיפוש סרטים לפי שם עם חיפוש מטושטש (LIKE)
export async function searchMoviesByTitle(title) {
    const [rows] = await pool.query(
        `SELECT * FROM movie WHERE title LIKE ?`,
        [`%${title}%`]
    );
    return rows;
}

//קבלת כל השחקנים שהשתתפו בסרט מסוים
export async function getActorsForMovie(movieId) {
    const [rows] = await pool.query(
        `SELECT actor.* FROM actor 
        JOIN movie_actor ON actor.actor_id = movie_actor.actor_id 
        WHERE movie_actor.film_id = ?`,
        [movieId]
    );
    return rows;
}

//הצגת כל הסרטים השייכים לקטגוריה מסוימת.
export async function getMoviesByCategory(categoryId) {
    const [rows] = await pool.query(
        `SELECT movie.* FROM movie 
        JOIN movie_category ON movie.film_id = movie_category.film_id 
        WHERE movie_category.category_id = ?`,
        [categoryId]
    );
    return rows;
}

//חישוב סך כל התשלומים שבוצעו על ידי לקוח
export async function getTotalPaymentsByCustomer(customerId) {
    const [rows] = await pool.query(
        `SELECT SUM(amount) as totalPayments FROM payment WHERE customer_id = ?`,
        [customerId]
    );
    return rows[0].totalPayments;
}

//קבלת רשימה של כל הלקוחות הפעילים במערכת
export async function getActiveCustomers() {
    const [rows] = await pool.query(
        `SELECT * FROM customer WHERE active = 1`
    );
    return rows;
}

//מציאת קטגוריית הסרט לפי הסרט עצמו.
export async function getCategoryForMovie(movieId) {
    const [rows] = await pool.query(
        `SELECT category.* FROM category 
        JOIN movie_category ON category.category_id = movie_category.category_id 
        WHERE movie_category.film_id = ?`,
        [movieId]
    );
    return rows;
}


//קבלת רשימת סרטים שיצאו אחרי שנה מסוימת
export async function getMoviesAfterYear(year) {
    const [rows] = await pool.query(
        `SELECT * FROM movie WHERE release_year > ?`,
        [year]
    );
    return rows;
}

//קבלת מספר הסרטים בקטגוריה מסוימת.
export async function countMoviesInCategory(categoryId) {
    const [rows] = await pool.query(
        `SELECT COUNT(*) as totalMovies FROM movie_category WHERE category_id = ?`,
        [categoryId]
    );
    return rows[0].totalMovies;
}

//קבלת כל הסרטים לפי דירוג מסוים (למשל "G", "PG").
export async function getMoviesByRating(rating) {
    const [rows] = await pool.query(
        `SELECT * FROM movie WHERE rating = ?`,
        [rating]
    );
    return rows;
}
