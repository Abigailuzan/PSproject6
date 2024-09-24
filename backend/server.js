const express = require('express');
const cors = require('cors');
const { getCustomerByID,getCustomerByEmail, getAllCustomers, insertCustomer, updateCustomer, deleteCustomer,
    getMovieByID, getAllMovies,getTotalMoviesByTitle, insertMovie, updateMovie, deleteMovie, getMoviesByTitle, updateMovieByTitle,
    getActorByID, getAllActors, insertActor, updateActor, deleteActor,
    getPaymentByID, getAllPayments, insertPayment, updatePayment, deletePayment,
    getAllHistory, insertHistory, updateHistory, deleteHistory,
    getCityByID, getAllCities, insertCity, updateCity, deleteCity,
    getCountryByID, getAllCountries, insertCountry, updateCountry, deleteCountry,
    getAdminByID, getAllAdmins, insertAdmin, updateAdmin, deleteAdmin,
    getCategoryByID, getAllCategories, insertCategory, updateCategory, deleteCategory,
    getMovieActorByIDs, getAllMovieActors, insertMovieActor, updateMovieActor, deleteMovieActor,
    getMovieCategoryByIDs, getAllMovieCategories, insertMovieCategory, updateMovieCategory,
    deleteMovieCategory, getMoviesByCategory, getAllMovieYear, getMovieByRating, getPaymentByCustomer,
    getRentalByCustomer, getCategoriesOfMovie, getActorsOfMovie, getMoviesOfActor, getAllActiveCustomers,
    getTotalMovies, getAdminByMail,deleteMovieActorByFilmId,deleteMovieCategoryByFilmId,
    getFilteredMoviesByClientRequest
} = require("./database");
const nodemailer = require("nodemailer");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


// CRUD routes for Customer
app.get('/customers/:id', async (req, res) => {
    try {
        const customer = await getCustomerByID(req.params.id);
        if (customer) {
            return res.status(200).json(customer);
        } else {
            return res.status(404).json({ error: 'Customer not found' });  // אם לא נמצא הלקוח
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching customer' });
    }
});
app.get('/customers', async (req, res) => {
    try {
        const customers = await getAllCustomers();
        return res.status(200).json(customers);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching customers' });
    }
});
app.post('/customers', async (req, res) => {
    try {
        // בדיקת אם קיים לקוח עם אותו מייל
        if (await getCustomerByEmail(req.body.email)) {
            return res.status(400).json({ error: 'Account with this email already exists' });
        }

        if (!req.body.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(req.body.password)) {
            return res.status(400).json({
                error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.'
            });
        }
        if (req.body.email.includes('staff')) {
            return res.status(400).json({ error: 'Email is problematic' });
        }

        // יצירת הלקוח
        const newCustomer = await insertCustomer(req.body);
        await mailSendToCustomer(newCustomer.email);
        return res.status(201).json(newCustomer);

    } catch (error) {
        return res.status(500).json({ error: `Error creating customer: ${error.message}` });
    }
});
app.put('/customers/:id', async (req, res) => {
    try {
        /*const customer = await getCustomerByEmail(req.body.email);
        if(customer && (req.params.id !== customer.customer_id)){
            res.status(400).json({ error: 'Account with this email already exists' });
        }
        else */ if (req.body.email.includes('staff'))
            return res.status(400).json({ error: 'Email is problematic' });
        const updatedCustomer = await updateCustomer(req.params.id, req.body);
        if (updatedCustomer) {
            console.log(updatedCustomer)
            return res.status(200).json(updatedCustomer);
        } else {
            return res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        console.error('Error updating customer:', error.message);
        return res.status(500).json({ error: 'Error updating customer' });
    }
});
app.delete('/customers/:id', async (req, res) => {
    try {
        const success = await deleteCustomer(req.params.id);  // מחיקת הלקוח
        if (success) {
            return res.status(204).end();  // אם הלקוח נמחק בהצלחה
        } else {
            return res.status(404).json({ error: 'Customer not found' });  // אם הלקוח לא נמצא
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting customer' });
    }
});
app.get('/customers/email/:email', async (req, res) => {
    try {
        const customer = await getCustomerByEmail(req.params.email);
        if (customer) {
            return res.status(200).json(customer);
        } else {
            return res.status(404).json({ error: 'account does not exist' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching customer by email' });
    }
});

// CRUD routes for Movie
app.get('/movies/:id', async (req, res) => {
    const movie = await getMovieByID(req.params.id);
    movie ? res.json(movie) : res.status(404).json({ error: 'Movie not found' });
});
app.get('/movies', async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 20;
    const offset = parseInt(req.query.offset, 10) || 0;
    try {
        const movies = await getAllMovies(limit, offset);
        const total = await getTotalMovies();
        return res.status(200).json({ movies, total });
    } catch (error) {
        console.error('Error fetching movies:', error); // הדפסת השגיאה
        return res.status(500).json({ error: 'Error fetching movies' });
    }
});
app.get('/movies/title/:title', async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 20;
    const offset = parseInt(req.query.offset, 10) || 0;
    try {
        const movies = await getMoviesByTitle(req.params.title,limit,offset);
        console.log("Movies:", movies);
        const total = await getTotalMoviesByTitle(req.params.title);
        console.log("Total movies:", total);
        return res.status(200).json({ movies, total });
    } catch (error) {
        console.error('Error fetching movies:', error);
        return res.status(500).json({ error: 'Error fetching movies' });
    }
});
app.post('/movies', async (req, res) => {
    try {
        if (!req.body.verification_email.includes('staff') ||  !await getAdminByMail(req.body.verification_email)){
            return res.status(400).json({ error: 'only existing admins can insert a new admin' });
        }
        const newMovie = await insertMovie(req.body);
        return res.status(201).json(newMovie);
    } catch (error) {
        return res.status(500).json({ error: `Error creating customer  ${error.message}` });
    }
});
app.put('/movies/:id/:email', async (req, res) => {
    try {
        if (!req.params.email.includes('staff') ||  !await getAdminByMail(req.params.email)){
            return res.status(400).json({ error: 'only existing admins can update a movie' });
        }
        const updatedMovie = await updateMovie(req.params.id, req.body);
        if (updatedMovie) {
            return res.status(200).json(updatedMovie);
        } else {
            return res.status(404).json({ error: 'movie not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating movie' });
    }
});
app.delete('/movies/:id/:email', async (req, res) => {
    try {
        if (!req.params.email.includes('staff') ||  !await getAdminByMail(req.params.email)){
            return res.status(400).json({ error: 'only existing admins can delete a movie' });
        }
        const successDeleteMovie = await deleteMovie(req.params.id);
        const successDeleteMovieCategory = await deleteMovieCategoryByFilmId(req.params.id);
        const successDeleteMovieActor = await deleteMovieActorByFilmId(req.params.id);
        if (successDeleteMovie && successDeleteMovieCategory && successDeleteMovieActor) {
            return res.status(204).end();
        } else {
            return res.status(404).json({ error: 'movie not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting movie' });
    }
});
app.put('/movies/title/:title/:email', async (req, res) => {
    try {
        if (!req.params.email.includes('staff') ||  !await getAdminByMail(req.params.email)){
            return res.status(400).json({ error: 'only existing admins can insert a new admin' });
        }
        const updatedMovie = await updateMovieByTitle(req.params.title, req.body);
        if (updatedMovie) {
            return res.status(200).json(updatedMovie);
        } else {
            return res.status(404).json({ error: 'movie not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating movie' });
    }
});

// CRUD routes for Actor
app.get('/actors/:id', async (req, res) => {
    try {
        const actor = await getActorByID(req.params.id);
        if (actor) {
            return res.status(200).json(actor);
        } else {
            return res.status(404).json({ error: 'actor not found' });  // אם לא נמצא הלקוח
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching actor' });
    }
});
app.get('/actors', async (req, res) => {
    try {
        const actors = await getAllActors();
        return res.status(200).json(actors);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching actors' });
    }
});
/*
app.post('/actors', async (req, res) => {
    try {
        const newActor = await insertActor(req.body);
        return res.status(201).json(newActor);
    } catch (error) {
        return res.status(500).json({ error: 'Error creating Actor' });
    }
});
app.put('/actors/:id', async (req, res) => {
    try {
        const updatedActor = await updateActor(req.params.id, req.body);
        if (updatedActor) {
            return res.status(200).json(updatedActor);
        } else {
            return res.status(404).json({ error: 'Actor not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating Actor' });
    }
});
app.delete('/actors/:id', async (req, res) => {
    try {
        const success = await deleteActor(req.params.id);
        if (success) {
            return res.status(204).end();
        } else {
            return res.status(404).json({ error: 'actor not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'Error deleting actor' });
    }
});
app.get('/payments/:id', async (req, res) => {
    try {
        const payment = await getPaymentByID(req.params.id);
        if (payment) {
            return res.status(200).json(payment);
        } else {
            return res.status(404).json({ error: 'payment not found' });  // אם לא נמצא הלקוח
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching payment' });
    }
});
app.get('/payments', async (req, res) => {
    try {
        const payments = await getAllPayments();
        return res.status(200).json(payments);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching payments' });
    }
});
app.post('/payments', async (req, res) => {
    try {
        const newPayment = await insertPayment(req.body);
        return res.status(201).json(newPayment);
    } catch (error) {
        return res.status(500).json({ error: `Error creating payment  ${error.message}` });
    }
});
app.put('/payments/:id', async (req, res) => {
    try {
        const updatedPayment = await updatePayment(req.params.id, req.body);
        if (updatedPayment) {
            return res.status(200).json(updatedPayment);
        } else {
            return res.status(404).json({ error: 'payment not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating payment' });
    }
});
app.delete('/payments/:id', async (req, res) => {
    try {
        const success = await deletePayment(req.params.id);
        if (success) {
            return res.status(204).end();
        } else {
            return res.status(404).json({ error: 'payment not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting payment' });
    }
});
*/
// CRUD routes for history
app.get('/history/:id', async (req, res) => {
    try {
        const history = await getAllHistory(req.params.id);
        if (history && history.length > 0) {
            return res.status(200).json(history);
        } else {
            return res.status(404).json({ error: 'No movies found for this customer' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching customer movie history' });
    }
});
app.post('/history', async (req, res) => {
    try {
        const newRental = await insertHistory(req.body);
        return res.status(201).json(newRental);
    } catch (error) {
        return res.status(500).json({ error: 'Error creating history' });
    }
});
app.put('/history/:id', async (req, res) => {
    try {
        const updatedHistory = await updateHistory(req.params.id, req.body);
        if (updatedHistory.length > 0) { // Ensure there are returned rows
            return res.status(200).json(updatedHistory);
        } else {
            return res.status(404).json({ error: 'History not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating history' });
    }
});
app.delete('/history/:id', async (req, res) => {
    try {
        const success = await deleteHistory(req.params.id);
        if (success) {
            return res.status(204).end();
        } else {
            return res.status(404).json({ error: 'History not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting history' });
    }
});

/*
// CRUD routes for City

app.get('/cities/:id', async (req, res) => {
   try {
        const city = await getCityByID(req.params.id);
        if (city) {
            return res.status(200).json(city);
        } else {
            return res.status(404).json({ error: 'city was not found' });  // אם לא נמצא
        }
    } catch (error) {
       return res.status(500).json({ error: 'Error fetching city' });
    }
});
app.get('/cities', async (req, res) => {
    try {
        const cities = await getAllCities();
        return res.status(200).json(cities);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching cities' });
    }
});
app.post('/cities', async (req, res) => {
    try {
        const newCity = await insertCity(req.body);
        return res.status(201).json(newCity);
    } catch (error) {
        return res.status(500).json({ error: 'Error creating new City ' });
    }
});
app.put('/cities/:id', async (req, res) => {
    try {
        const updatedCity = await updateCity(req.params.id, req.body);
        if (updatedCity) {
            return res.status(200).json(updatedCity);
        } else {
            return res.status(404).json({ error: 'City was not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating City' });
    }
});
app.delete('/cities/:id', async (req, res) => {
   try {
        const success = await deleteCity(req.params.id);
        if (success) {
            return res.status(204).end();
        } else {
            return res.status(404).json({ error: 'City that text was not found' });
        }
    } catch (error) {
       return res.status(500).json({ error: 'Error deleting City' });
    }
});

// CRUD routes for Country
app.get('/countries/:id', async (req, res) => {
    try {
        const country = await getCountryByID(req.params.id);
        if (country) {
            return res.status(200).json(country);
        } else {
            return res.status(404).json({ error: 'country was not found' });  // אם לא נמצא
            // הלקוח
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching country' });
    }
});
app.get('/countries', async (req, res) => {
    try {
        const countries = await getAllCountries();
        return res.status(200).json(countries);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching countries' });
    }
});
app.post('/countries', async (req, res) => {
    try {
        const newCountry = await insertCountry(req.body);
        return res.status(201).json(newCountry);
    } catch (error) {
        return res.status(500).json({ error: 'Error creating new Country ' });
    }
});
app.put('/countries/:id', async (req, res) => {
    try {
        const updatedCountry = await updateCountry(req.params.id, req.body);
        if (updatedCountry) {
            return res.status(200).json(updatedCountry);
        } else {
            return res.status(404).json({ error: 'Country was not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating Country' });
    }
});
app.delete('/countries/:id', async (req, res) => {
    try {
        const success = await deleteCountry(req.params.id);
        if (success) {
            return res.status(204).end();
        } else {
            return res.status(404).json({ error: 'Country that text was not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting Country' });
    }
});
*/
// CRUD routes for Admin
app.get('/admins/:id', async (req, res) => {
    try {
        const admin = await getAdminByID(req.params.id);
        if (admin) {
            return res.status(200).json(admin);
        } else {
            return res.status(404).json({ error: 'admin was not found' });  // אם לא נמצא
            // הלקוח
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching admin' });
    }
});
app.get('/admins/email/:email', async (req, res) => {
    try {
        const admin = await getAdminByMail(req.params.email);
        if (admin) {
            return res.status(200).json(admin);
        } else {
            return res.status(404).json({ error: 'admin was not found' });  // אם לא נמצא
            // הלקוח
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching admin' });
    }
});
app.get('/admins', async (req, res) => {
    try {
        const admins = await getAllAdmins();
        return res.status(200).json(admins);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching admins' });
    }
});
app.post('/admins', async (req, res) => {
    try {
        if (await getAdminByMail(req.body.email)) {
            console.log('Admin with this email already exists');
            return res.status(400).json({ error: 'Admin with this email already exists' });
        }
        if (!req.body.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(req.body.password)) {
            console.log('Password must contain at least one uppercase letter, ' +
                'one lowercase letter, one number, one special character, and be at least 8 characters long.');
            return res.status(400).json({
                error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.'
            });
        }
        if (!req.body.email.includes('staff')) {
            console.log('Email is problematic!');
            return res.status(400).json({ error: 'Email is problematic!' });
        }
        if (!req.body.verification_email.includes('staff') ||  !await getAdminByMail(req.body.verification_email)){
            return res.status(400).json({ error: 'only existing admins can insert a new admin' });
        }
        const newAdmin = await insertAdmin(req.body);
        if (newAdmin) {
            return res.status(201).json(newAdmin);
        } else {
            return res.status(401).json({ error: 'Failed to add the new admin' });
        }
    } catch (error) {
        return res.status(500).json({ error: `Error creating new Admin: ${error.message}` });
    }
});
app.put('/admins/:id', async (req, res) => {
    try {
        if (!req.body.email.includes('staff'))
            return res.status(400).json({ error: 'Email is problematic' });
        if (!req.body.verification_email.includes('staff') ||  !await getAdminByMail(req.body.verification_email)){
            return res.status(400).json({ error: 'only existing admins can insert a new admin' });
        }
        const updatedAdmin = await updateAdmin(req.params.id, req.body);
        if (updatedAdmin) {
            return res.status(200).json(updatedAdmin);
        } else {
            return res.status(404).json({ error: 'admin was not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `Error updating admin  ${error.message}` });
    }
});
app.delete('/admins/:id/:email', async (req, res) => {
    try {
        const admins = await getAllAdmins();
        if (admins.length === 1) {
            return res.status(400).json({ error:'request to delete this account because of a' +
                    ' safety' + ' issues'})
        }
        if (!req.params.email.includes('staff') ||  !await getAdminByMail(req.params.email)){
            return res.status(400).json({ error: 'only existing admins can delete a new admin' });
        }
        else{
            const success = await deleteAdmin(req.params.id);
            if (success) {
                return res.status(204).end();
            } else {
                return res.status(404).json({ error: 'admin that text was not found' });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting admin' });
    }
});

// CRUD routes for Category
app.get('/categories/:id', async (req, res) => {
    try {
        const category = await getCategoryByID(req.params.id);
        if (category) {
            return res.status(200).json(category);
        } else {
            return res.status(404).json({ error: 'category was not found' });  // אם לא נמצא
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching category' });
    }
});
app.get('/categories', async (req, res) => {
    try {
        const categories = await getAllCategories();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching categories' });
    }
});
app.post('/categories', async (req, res) => {
  try {
        const newCategory = await insertCategory(req.body);
      return res.status(201).json(newCategory);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating new Category ' });
    }
});
app.put('/categories/:id/', async (req, res) => {
    try {
        const updatedCategory = await updateCategory(req.params.id, req.body);
        return res.status(201).json(updatedCategory);
    } catch (error) {
        return res.status(500).json({ error: 'Error  update Category ' });
    }
});
app.delete('/categories/:id', async (req, res) => {
   try {
        const success = await deleteCategory(req.params.id);
        if (success) {
            return res.status(204).end();
        } else {
            return res.status(404).json({ error: 'category that text was not found' });
        }
    } catch (error) {
       return res.status(500).json({ error: 'Error deleting category' });
    }

});

// CRUD routes for Movie Actor
app.get('/movieactors/:actorId/:filmId', async (req, res) => {
    try {
        const movieActor = await getMovieActorByIDs(req.params.actorId, req.params.filmId);
        if (movieActor) {
            return res.status(200).json(movieActor);
        } else {
            return res.status(404).json({ error: 'movie Actor was not found' });  // אם לא נמצא
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching movie Actor' });
    }
});
app.get('/movieactors', async (req, res) => {
    try {
        const movieActors = await getAllMovieActors();
        return res.status(200).json(movieActors);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching movieActors' });
    }
});
app.post('/movieactors', async (req, res) => {
    try {
        if (!req.body.verification_email.includes('staff') ||  !await getAdminByMail(req.body.verification_email)){
            return res.status(400).json({ error: 'only existing admins can delete a movie' +
                    '  actor ' });
        }
        const newMovieActor = await insertMovieActor(req.body);
        return res.status(201).json(newMovieActor);
    } catch (error) {
        return res.status(500).json({ error: `Error creating new Movie Actor  ${error.message}` });
    }
});
app.put('/movieactors/:actorId/:filmId/:email', async (req, res) => {
    try {
        if (!req.params.email.includes('staff') ||  !await getAdminByMail(req.params.email)){
            return res.status(400).json({ error: 'only existing admins can delete a movie' +
                    '  actor ' });
        }
        const updatedMovieActor = await updateMovieActor(req.params.actorId, req.params.filmId, req.body);
        return res.status(201).json(updatedMovieActor);
    } catch (error) {
        return res.status(500).json({ error: `Error  update Movie Actor  ${error.message} ` });
    }
});
app.delete('/movieactor/:actorId/:filmId', async (req, res) => {
   try {
       if (!req.params.email.includes('staff') ||  !await getAdminByMail(req.params.email)){
           return res.status(400).json({ error: 'only existing admins can delete a movie' +
                   '  actor ' });
       }
        const success = await deleteMovieActor(req.params.actorId, req.params.filmId);
        if (success) {
            return res.status(204).end();
        } else {
            return res.status(404).json({ error: 'movie-actor was not found' });
        }
    } catch (error) {
       return res.status(500).json({ error: 'Error deleting movie-actor' });
    }
});
app.delete('/movieactors/:id/:email', async (req, res) => {
    try {
        if (!req.params.email.includes('staff') ||  !await getAdminByMail(req.params.email)){
            return res.status(400).json({ error: 'only existing admins can delete a movie' +
                    '  actor ' });
        }
        console.log(req.params.id,'server ')
        const success = await deleteMovieActorByFilmId(req.params.id);
        if (success) {
            return res.status(204).end();
        } else {
            return res.status(404).json({ error: 'movie-actor was not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting movie-actor' });
    }
});

// CRUD routes for Movie Category
app.get('/moviecategories/:filmId/:categoryId/', async (req, res) => {
    try {
        const movieCategory = await getMovieCategoryByIDs(req.params.filmId, req.params.categoryId);
        if (movieCategory) {
            return res.status(200).json(movieCategory);
        } else {
            return res.status(404).json({ error: 'movies were not found' });  // אם לא נמצא
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching  movies' });
    }
});
app.get('/moviecategories', async (req, res) => {
    try {
        const movieCategories = await getAllMovieCategories();
        return res.status(200).json(movieCategories);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching movie Categories' });
    }
});
app.post('/moviecategories', async (req, res) => {
    try {
        if (!req.body.verification_email.includes('staff') ||  !await getAdminByMail(req.body.verification_email)){
            return res.status(400).json({ error: 'only existing admins can update  a movie' +
                    '  category ' });
        }
        const newMovieCategory = await insertMovieCategory(req.body);
        return res.status(201).json(newMovieCategory);
    } catch (error) {
        return res.status(500).json({ error: `Error creating new Movie Category  ${error.message}` });
    }
});
app.put('/moviecategories/:filmId/:categoryId/:email', async (req, res) => {
    try {
        if (!req.params.email.includes('staff') ||  !await getAdminByMail(req.params.email)){
            return res.status(400).json({ error: 'only existing admins can update  a movie' +
                    '  category ' });
        }
        const updatedMovieCategory = await updateMovieCategory(req.params.filmId, req.params.categoryId, req.body);
        return res.status(201).json(updatedMovieCategory);
    } catch (error) {
        return res.status(500).json({ error: `Error update Movie Category  ${error.message} `});
    }
});
app.delete('/moviecategories/:filmId/:categoryId/:email', async (req, res) => {
    try {
        const success = await deleteMovieCategory(req.params.filmId, req.params.categoryId);
        if (success) {
            return res.status(204).end();
        } else {
            return res.status(404).json({ error: 'movie to this category was not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting movie to this category' });
    }
});
/*
//advanced functions
app.get('/categories/movies/:categoryID',async (req, res)=>{
    try{
        const categoryID = req.params.categoryID;
        const moviesByCategory = await getMoviesByCategory(categoryID);
        if(moviesByCategory){
            return res.status(200).json(moviesByCategory);
        }
    }catch (error)
    {
        return res.status(500).json({ error: 'Error fetching movies to this category' });
    }
})
app.get('/movies/year/:year',async (req,res)=>{
    try{
        const year = req.params.year;
        const moviesToYear = await getAllMovieYear(year);
        if(moviesToYear){
            return res.status(200).json(moviesToYear);
        }
    }catch (error){
        return res.status(500).json({ error: `${error.message}` });
    }
})
app.get('/movies/rating/:rating',async (req,res)=>{
    try{
        const rating = req.params.rating.toUpperCase();
        const moviesToRating = await getMovieByRating(rating);
        if(moviesToRating){
            return res.status(200).json(moviesToRating);
        }
    }catch (error){
        return res.status(500).json({ error: `${error.message}` });
    }
})
app.get('/customer/payment/:id',async (req,res)=>{
    try{
        const customerID = req.params.id;
        const PaymentByCustomer = await getPaymentByCustomer(customerID);
        if(PaymentByCustomer){
            return res.status(200).json(PaymentByCustomer);
        }
    }catch (error){
        return res.status(500).json({ error: `${error.message}` });
    }
})
app.get('/customer/rental/:id',async (req,res)=>{
    try{
        const customerID = req.params.id;
        const RentalByCustomer = await getRentalByCustomer(customerID);
        if(RentalByCustomer){
            return res.status(200).json(RentalByCustomer);
        }
    }catch (error){
        return res.status(500).json({ error: `${error.message}` });
    }
})
app.get('/movies/categories/:id',async (req,res)=>{
    try{
        const movieID = req.params.id;
        const CategoriesOfMovie = await getCategoriesOfMovie(movieID);
        if(CategoriesOfMovie){
            return res.status(200).json(CategoriesOfMovie);
        }
    }catch (error){
        return res.status(500).json({ error: `${error.message}` });
    }
})
app.get('/movies/actors/:id',async (req,res)=>{
    try{
        const movieID = req.params.id;
        const ActorsOfMovie = await getActorsOfMovie(movieID);
        if(ActorsOfMovie){
            return res.status(200).json(ActorsOfMovie);
        }
    }catch (error){
        return res.status(500).json({ error: `${error.message}` });
    }
})
*/
app.get('/moviesFilters', async (req, res) => {
    try {
        console.log('Received query:', (req.query));
        const {movies,total} = await getFilteredMoviesByClientRequest(req.query);
        res.status(200).json({movies:movies,total:total});
    } catch (error) {
        console.error('Error fetching filtered movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/actors/movies/:id',async (req,res)=>{
    try{
        const actorID = req.params.id;
        const MoviesOfActor = await getMoviesOfActor(actorID);
        if(MoviesOfActor){
            return res.status(200).json(MoviesOfActor);
        }
    }catch (error){
        return res.status(500).json({ error: `${error.message}` });
    }
})
app.get('/active/customers', async (req, res) => {
    try {
        const activeCustomers = await getAllActiveCustomers();
        console.log(activeCustomers)
        if(activeCustomers){
            return res.status(200).json(activeCustomers);
        }
    } catch (error) {
        return res.status(500).json({ error: `${error.message}` });
    }
});
app.post('/contactus',async (req,res)=>{
   try{
       const requestData = req.body;
       await mailSendToAdmin(requestData);
       return res.status(200).json({auto_response:'thank you for contacting us'});
   } catch (error) {
       return res.status(500).json({ error: `${error.message}` });
   }
});



module.exports = app;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//help function
async function mailSendToCustomer(customer_email) {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'servermoviewatch@gmail.com',
            pass: "pyjx xshm gevr deih\n",
        },
    });

    let info = await transporter.sendMail({
        from: '"Movie Watch Team" <servermoviewatch@gmail.com>',
        to: customer_email,
        subject: "Welcome to Movie Watch!",
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <div style="background-color: #4CAF50; padding: 20px; text-align: center; color: white;">
                <h1>Welcome to Movie Watch!</h1>
            </div>
            <div style="padding: 20px;">
                <p>Hi there,</p>
                <p>We're excited to have you on board! 🎉</p>
                <p>Thank you for joining <strong>Movie Watch</strong>, where you can discover and enjoy a wide variety of films.</p>
                <p>We hope you'll have a great experience with us. If you have any questions, feel free to reach out to our support team at any time.</p>
                <p>Enjoy the movies! 🍿</p>
                <br>
                <p>Best regards,<br>The Movie Watch Team</p>
            </div>
            <div style="background-color: #f0f0f0; padding: 10px; text-align: center;">
                <p style="font-size: 12px;">© 2024 Movie Watch. All rights reserved.</p>
            </div>
        </div>
        `,
    });
    console.log(info.messageId);
}
async function mailSendToAdmin(requestContactUs) {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'servermoviewatch@gmail.com',
            pass: "pyjx xshm gevr deih\n",
        },
    });

    let info = await transporter.sendMail({
        from: '"Movie Watch Team" <servermoviewatch@gmail.com>',
        to: 'moviestaff109@gmail.com',
        subject: requestContactUs.subject,
        html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <div style="color: #555555; line-height: 1.6;">
                <p style="font-size: 16px;">${requestContactUs.message}</p>
                <p style="font-size: 14px; color: #888888;">The request was asked by: <strong>${requestContactUs.email}</strong></p>
            </div>
        </div>
        <div style="text-align: center; padding-top: 20px;">
            <p style="font-size: 12px; color: #888888;">&copy; 2024 Movie Watch. All rights reserved.</p>
        </div>
    </div>
    `,
    });

    console.log(info.messageId);
}