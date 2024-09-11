const express = require('express');
const cors = require('cors');
const { getCustomerByID,getCustomerByEmail, getAllCustomers, insertCustomer, updateCustomer, deleteCustomer,
    getMovieByID, getAllMovies, insertMovie, updateMovie, deleteMovie, getMoviesByTitle, updateMovieByTitle,
    getActorByID, getAllActors, insertActor, updateActor, deleteActor,
    getPaymentByID, getAllPayments, insertPayment, updatePayment, deletePayment,
    getRentalByID, getAllRentals, insertRental, updateRental, deleteRental,
    getMovieTextByID, getAllMovieTexts, insertMovieText, updateMovieText, deleteMovieText,
    getCityByID, getAllCities, insertCity, updateCity, deleteCity,
    getCountryByID, getAllCountries, insertCountry, updateCountry, deleteCountry,
    getLanguageByID, getAllLanguages, insertLanguage, updateLanguage, deleteLanguage,
    getAdminByID, getAllAdmins, insertAdmin, updateAdmin, deleteAdmin,
    getCategoryByID, getAllCategories, insertCategory, updateCategory, deleteCategory,
    getMovieActorByIDs, getAllMovieActors, insertMovieActor, updateMovieActor, deleteMovieActor,
    getMovieCategoryByIDs, getAllMovieCategories, insertMovieCategory, updateMovieCategory, deleteMovieCategory,


} = require("./database");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// הוסף כאן את כל הראוטים, כמו שהגדרת:

// CRUD routes for Customer
app.get('/customers/:id', async (req, res) => {
    try {
        const customer = await getCustomerByID(req.params.id);
        if (customer) {
            res.status(200).json(customer);  // אם נמצא הלקוח, מחזיר את הנתונים שלו
        } else {
            res.status(404).json({ error: 'Customer not found' });  // אם לא נמצא הלקוח
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching customer' });
    }
});
app.get('/customers', async (req, res) => {
    try {
        const customers = await getAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching customers' });
    }
});
app.post('/customers', async (req, res) => {
    try {
        const newCustomer = await insertCustomer(req.body);
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ error: 'Error creating customer' });
    }
});
app.put('/customers/:id', async (req, res) => {
    try {
        const updatedCustomer = await updateCustomer(req.params.id, req.body);
        if (updatedCustomer) {
            res.status(200).json(updatedCustomer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating customer' });
    }
});
app.delete('/customers/:id', async (req, res) => {
    try {
        const success = await deleteCustomer(req.params.id);  // מחיקת הלקוח
        if (success) {
            res.status(204).end();  // אם הלקוח נמחק בהצלחה
        } else {
            res.status(404).json({ error: 'Customer not found' });  // אם הלקוח לא נמצא
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting customer' });
    }
});
app.get('/customers/email/:email', async (req, res) => {
    try {
        const customer = await getCustomerByEmail(req.params.email);
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching customer by email' });
    }
});

// CRUD routes for Movie
app.get('/movies/:id', async (req, res) => {
    const movie = await getMovieByID(req.params.id);
    movie ? res.json(movie) : res.status(404).json({ error: 'Movie not found' });
});
app.get('/movies', async (req, res) => {
    try {
        const movies = await getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching movies' });
    }
});
app.post('/movies', async (req, res) => {
    try {
        const newMovie = await insertMovie(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: 'Error creating customer' });
    }
});
app.put('/movies/:id', async (req, res) => {
    try {
        const updatedMovie = await updateMovie(req.params.id, req.body);
        if (updatedMovie) {
            res.status(200).json(updatedMovie);
        } else {
            res.status(404).json({ error: 'movie not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating movie' });
    }
});
app.delete('/movies/:id', async (req, res) => {
    try {
        const success = await deleteMovie(req.params.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting movie' });
    }
});
app.get('/movies/title/:title', async (req, res) => {
    const movies = await getMoviesByTitle(req.params.title);
    res.json(movies);
});
app.put('/movies/title/:title', async (req, res) => {
    try {
        const updatedMovie = await updateMovieByTitle(req.params.title, req.body);
        if (updatedMovie) {
            res.status(200).json(updatedMovie);
        } else {
            res.status(404).json({ error: 'movie not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating movie' });
    }
});

// CRUD routes for Actor
app.get('/actors/:id', async (req, res) => {
    try {
        const actor = await getActorByID(req.params.id);
        if (actor) {
            res.status(200).json(actor);
        } else {
            res.status(404).json({ error: 'actor not found' });  // אם לא נמצא הלקוח
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching actor' });
    }
});
app.get('/actors', async (req, res) => {
    try {
        const actors = await getAllActors();
        res.status(200).json(actors);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching actors' });
    }
});
app.post('/actors', async (req, res) => {
    const newActor = await insertActor(req.body);
    res.status(201).json(newActor);
    try {
        const newActor = await insertActor(req.body);
        res.status(201).json(newActor);
    } catch (error) {
        res.status(500).json({ error: 'Error creating Actor' });
    }
});
app.put('/actors/:id', async (req, res) => {
    try {
        const updatedActor = await updateActor(req.params.id, req.body);
        if (updatedActor) {
            res.status(200).json(updatedActor);
        } else {
            res.status(404).json({ error: 'Actor not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating Actor' });
    }
});
app.delete('/actors/:id', async (req, res) => {
    try {
        const success = await deleteActor(req.params.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'actor not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting actor' });
    }
});

// CRUD routes for Payment
app.get('/payments/:id', async (req, res) => {
    try {
        const payment = await getPaymentByID(req.params.id);
        if (payment) {
            res.status(200).json(payment);
        } else {
            res.status(404).json({ error: 'payment not found' });  // אם לא נמצא הלקוח
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payment' });
    }
});
app.get('/payments', async (req, res) => {
    try {
        const payments = await getAllPayments();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payments' });
    }
});
app.post('/payments', async (req, res) => {
    try {
        const newPayment = await insertPayment(req.body);
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ error: 'Error creating payment' });
    }
});
app.put('/payments/:id', async (req, res) => {
    try {
        const updatedPayment = await updatePayment(req.params.id, req.body);
        if (updatedPayment) {
            res.status(200).json(updatedPayment);
        } else {
            res.status(404).json({ error: 'payment not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating payment' });
    }
});
app.delete('/payments/:id', async (req, res) => {
    try {
        const success = await deletePayment(req.params.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'payment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting payment' });
    }
});

// CRUD routes for Rental
app.get('/rentals/:id', async (req, res) => {
    try {
        const rental = await getRentalByID(req.params.id);
        if (rental) {
            res.status(200).json(rental);
        } else {
            res.status(404).json({ error: 'rental not found' });  // אם לא נמצא הלקוח
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching rental' });
    }
});
app.get('/rentals', async (req, res) => {
    try {
        const rentals = await getAllRentals();
        res.status(200).json(rentals);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching rentals' });
    }
});
app.post('/rentals', async (req, res) => {
    try {
        const newRental = await insertRental(req.body);
        res.status(201).json(newRental);
    } catch (error) {
        res.status(500).json({ error: 'Error creating rental' });
    }
});
app.put('/rentals/:id', async (req, res) => {
    try {
        const updatedRental = await updateRental(req.params.id, req.body);
        if (updatedRental) {
            res.status(200).json(updatedRental);
        } else {
            res.status(404).json({ error: 'rental not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating rental' });
    }
});
app.delete('/rentals/:id', async (req, res) => {
    try {
        const success = await deleteRental(req.params.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'rental not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting rental' });
    }
});

// CRUD routes for Movie Text
app.get('/movieTexts/:id', async (req, res) => {
    try {
        const movieText = await getMovieTextByID(req.params.id);
        if (movieText) {
            res.status(200).json(movieText);
        } else {
            res.status(404).json({ error: 'movie with this text was not found' });  // אם לא נמצא
            // הלקוח
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching movies-text' });
    }
});
app.get('/movieTexts', async (req, res) => {
    try {
        const movieTexts = await getAllMovieTexts();
        res.status(200).json(movieTexts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching movie-text' });
    }
});
app.post('/movieTexts', async (req, res) => {
    try {
        const newMovieText = await insertMovieText(req.body);
        res.status(201).json(newMovieText);
    } catch (error) {
        res.status(500).json({ error: 'Error creating new movie text' });
    }
});
app.put('/movieTexts/:id', async (req, res) => {
    try {
        const updatedMovieText = await updateMovieText(req.params.id, req.body);
        if (updatedMovieText) {
            res.status(200).json(updatedMovieText);
        } else {
            res.status(404).json({ error: 'movie with this text was not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating movie text' });
    }
});
app.delete('/movieTexts/:id', async (req, res) => {
    try {
        const success = await deleteMovieText(req.params.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'movie with that text was not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting movie text' });
    }
});

// CRUD routes for City
app.get('/cities/:id', async (req, res) => {
   try {
        const city = await getCityByID(req.params.id);
        if (city) {
            res.status(200).json(city);
        } else {
            res.status(404).json({ error: 'city was not found' });  // אם לא נמצא
            // הלקוח
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching city' });
    }
});
app.get('/cities', async (req, res) => {
    try {
        const cities = await getAllCities();
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cities' });
    }
});
app.post('/cities', async (req, res) => {
    try {
        const newCity = await insertCity(req.body);
        res.status(201).json(newCity);
    } catch (error) {
        res.status(500).json({ error: 'Error creating new City ' });
    }
});
app.put('/cities/:id', async (req, res) => {
    try {
        const updatedCity = await updateCity(req.params.id, req.body);
        if (updatedCity) {
            res.status(200).json(updatedCity);
        } else {
            res.status(404).json({ error: 'City was not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating City' });
    }
});
app.delete('/cities/:id', async (req, res) => {
   try {
        const success = await deleteCity(req.params.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'City that text was not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting City' });
    }
});

// CRUD routes for Country
app.get('/countries/:id', async (req, res) => {
    try {
        const country = await getCountryByID(req.params.id);
        if (country) {
            res.status(200).json(country);
        } else {
            res.status(404).json({ error: 'country was not found' });  // אם לא נמצא
            // הלקוח
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching country' });
    }
});
app.get('/countries', async (req, res) => {
    try {
        const countries = await getAllCountries();
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching countries' });
    }
});
app.post('/countries', async (req, res) => {
    try {
        const newCountry = await insertCountry(req.body);
        res.status(201).json(newCountry);
    } catch (error) {
        res.status(500).json({ error: 'Error creating new Country ' });
    }
});
app.put('/countries/:id', async (req, res) => {
    try {
        const updatedCountry = await updateCountry(req.params.id, req.body);
        if (updatedCountry) {
            res.status(200).json(updatedCountry);
        } else {
            res.status(404).json({ error: 'Country was not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating Country' });
    }
});
app.delete('/countries/:id', async (req, res) => {
    try {
        const success = await deleteCountry(req.params.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Country that text was not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting Country' });
    }
});

// CRUD routes for Language
app.get('/languages/:id', async (req, res) => {
    try {
        const language = await getLanguageByID(req.params.id);
        if (language) {
            res.status(200).json(language);
        } else {
            res.status(404).json({ error: 'language was not found' });  // אם לא נמצא
            // הלקוח
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching language' });
    }
});
app.get('/languages', async (req, res) => {
    try {
        const languages = await getAllLanguages();
        res.status(200).json(languages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching languages' });
    }
});
app.post('/languages', async (req, res) => {
    try {
        const newLanguage = await insertLanguage(req.body);
        res.status(201).json(newLanguage);
    } catch (error) {
        res.status(500).json({ error: 'Error creating new Language ' });
    }
});
app.put('/languages/:id', async (req, res) => {
    try {
        const updatedLanguage = await updateLanguage(req.params.id, req.body);
        if (updatedLanguage) {
            res.status(200).json(updatedLanguage);
        } else {
            res.status(404).json({ error: 'Language was not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating Language' });
    }
});
app.delete('/languages/:id', async (req, res) => {

    try {
        const success = await deleteLanguage(req.params.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'languages that text was not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting languages' });
    }
});

// CRUD routes for Admin
app.get('/admins/:id', async (req, res) => {
    try {
        const admin = await getAdminByID(req.params.id);
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ error: 'admin was not found' });  // אם לא נמצא
            // הלקוח
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching admin' });
    }
});
app.get('/admins', async (req, res) => {
    try {
        const admins = await getAllAdmins();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching admins' });
    }
});
app.post('/admins', async (req, res) => {
    try {
        const newAdmin = await insertAdmin(req.body);
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json({ error: `Error creating new Admin  ${error.message}` });
    }
});
app.put('/admins/:id', async (req, res) => {
    try {
        const updatedAdmin = await updateAdmin(req.params.id, req.body);
        if (updatedAdmin) {
            res.status(200).json(updatedAdmin);
        } else {
            res.status(404).json({ error: 'admin was not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error updating admin  ${error.message}` });
    }
});
app.delete('/admins/:id', async (req, res) => {
    try {
        const success = await deleteAdmin(req.params.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'admin that text was not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting admin' });
    }
});

// CRUD routes for Category
app.get('/categories/:id', async (req, res) => {
    try {
        const category = await getCategoryByID(req.params.id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'category was not found' });  // אם לא נמצא
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching category' });
    }
});
app.get('/categories', async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching categories' });
    }
});
app.post('/categories', async (req, res) => {
  try {
        const newCategory = await insertCategory(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error creating new Category ' });
    }
});
app.put('/categories/:id', async (req, res) => {
    try {
        const updatedCategory = await updateCategory(req.params.id, req.body);
        res.status(201).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error  update Category ' });
    }
});
app.delete('/categories/:id', async (req, res) => {
   try {
        const success = await deleteCategory(req.params.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'category that text was not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category' });
    }

});

// CRUD routes for Movie Actor
app.get('/movieactors/:actorId/:filmId', async (req, res) => {
    try {
        const movieActor = await getMovieActorByIDs(req.params.actorId, req.params.filmId);
        if (movieActor) {
            res.status(200).json(movieActor);
        } else {
            res.status(404).json({ error: 'movie Actor was not found' });  // אם לא נמצא
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching movie Actor' });
    }
});
app.get('/movieactors', async (req, res) => {
    try {
        const movieActors = await getAllMovieActors();
        res.status(200).json(movieActors);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching movieActors' });
    }
});
app.post('/movieactors', async (req, res) => {
    try {
        const newMovieActor = await insertMovieActor(req.body);
        res.status(201).json(newMovieActor);
    } catch (error) {
        res.status(500).json({ error: `Error creating new Movie Actor  ${error.message}` });
    }
});
app.put('/movieactors/:actorId/:filmId', async (req, res) => {
    try {
        const updatedMovieActor = await updateMovieActor(req.params.actorId, req.params.filmId, req.body);
        res.status(201).json(updatedMovieActor);
    } catch (error) {
        res.status(500).json({ error: `Error  update Movie Actor  ${error.message} ` });
    }
});
app.delete('/movieactors/:actorId/:filmId', async (req, res) => {
   try {
        const success = await deleteMovieActor(req.params.actorId, req.params.filmId);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'movie-actor was not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting movie-actor' });
    }
});

// CRUD routes for Movie Category
app.get('/moviecategories/:filmId/:categoryId', async (req, res) => {
    try {
        const movieCategory = await getMovieCategoryByIDs(req.params.filmId, req.params.categoryId);
        if (movieCategory) {
            res.status(200).json(movieCategory);
        } else {
            res.status(404).json({ error: 'movies were not found' });  // אם לא נמצא
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching  movies' });
    }
});
app.get('/moviecategories', async (req, res) => {
    try {
        const movieCategories = await getAllMovieCategories();
        res.status(200).json(movieCategories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching movie Categories' });
    }
});
app.post('/moviecategories', async (req, res) => {
    try {
        const newMovieCategory = await insertMovieCategory(req.body);
        res.status(201).json(newMovieCategory);
    } catch (error) {
        res.status(500).json({ error: `Error creating new Movie Category  ${error.message}` });
    }
});
app.put('/moviecategories/:filmId/:categoryId', async (req, res) => {
    try {
        const updatedMovieCategory = await updateMovieCategory(req.params.filmId, req.params.categoryId, req.body);
        res.status(201).json(updatedMovieCategory);
    } catch (error) {
        res.status(500).json({ error: `Error update Movie Category  ${error.message} `});
    }
});
app.delete('/moviecategories/:filmId/:categoryId', async (req, res) => {
    try {
        const success = await deleteMovieCategory(req.params.filmId, req.params.categoryId);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'movie to this category was not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting movie to this category' });
    }
});

module.exports = app;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
