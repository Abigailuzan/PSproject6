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
const router = express();
const port = 5000;

router.use(cors());
router.use(express.json());


// CRUD routes for Customer
router.get('/customers/:id', async (req, res) => {
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

router.get('/customers', async (req, res) => {
    try {
        const customers = await getAllCustomers();
        res.status(200).json(customers);  // מחזיר רשימה של כל הלקוחות
    } catch (error) {
        res.status(500).json({ error: 'Error fetching customers' });
    }
});

router.post('/customers', async (req, res) => {
    try {
        const newCustomer = await insertCustomer(req.body);  // יוצר לקוח חדש עם הנתונים שנשלחו
        res.status(201).json(newCustomer);  // מחזיר את הלקוח החדש שנוצר
    } catch (error) {
        res.status(500).json({ error: 'Error creating customer' });
    }
});

router.put('/customers/:id', async (req, res) => {
    try {
        const updatedCustomer = await updateCustomer(req.params.id, req.body);  // מעדכן את פרטי הלקוח
        if (updatedCustomer) {
            res.status(200).json(updatedCustomer);  // אם הלקוח קיים ומעודכן
        } else {
            res.status(404).json({ error: 'Customer not found' });  // אם הלקוח לא נמצא
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating customer' });
    }
});

router.delete('/customers/:id', async (req, res) => {
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
router.get('/customers/email/:email', async (req, res) => {
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
router.get('/movies/:id', async (req, res) => {
    const movie = await getMovieByID(req.params.id);
    movie ? res.json(movie) : res.status(404).json({ error: 'Movie not found' });
});

router.get('/movies', async (req, res) => {
    const movies = await getAllMovies();
    res.json(movies);
});
router.post('/movies', async (req, res) => {
    const newMovie = await insertMovie(req.body);
    res.status(201).json(newMovie);
});

router.put('/movies/:id', async (req, res) => {
    const updatedMovie = await updateMovie(req.params.id, req.body);
    res.json(updatedMovie);
});

router.delete('/movies/:id', async (req, res) => {
    const success = await deleteMovie(req.params.id);
    success ? res.status(204).end() : res.status(404).json({ error: 'Movie not found' });
});

router.get('/movies/title/:title', async (req, res) => {
    const movies = await getMoviesByTitle(req.params.title);
    res.json(movies);
});

router.put('/movies/title/:title', async (req, res) => {
    const success = await updateMovieByTitle(req.params.title, req.body);
    success ? res.status(204).end() : res.status(404).json({ error: 'Movie not updated' });
});

// CRUD routes for Actor
router.get('/actors/:id', async (req, res) => {
    const actor = await getActorByID(req.params.id);
    actor ? res.json(actor) : res.status(404).json({ error: 'Actor not found' });
});

router.get('/actors', async (req, res) => {
    const actors = await getAllActors();
    res.json(actors);
});

router.post('/actors', async (req, res) => {
    const newActor = await insertActor(req.body);
    res.status(201).json(newActor);
});

router.put('/actors/:id', async (req, res) => {
    const updatedActor = await updateActor(req.params.id, req.body);
    res.json(updatedActor);
});

router.delete('/actors/:id', async (req, res) => {
    const success = await deleteActor(req.params.id);
    success ? res.status(204).end() : res.status(404).json({ error: 'Actor not found' });
});

// CRUD routes for Payment
router.get('/payments/:id', async (req, res) => {
    const payment = await getPaymentByID(req.params.id);
    payment ? res.json(payment) : res.status(404).json({ error: 'Payment not found' });
});

router.get('/payments', async (req, res) => {
    const payments = await getAllPayments();
    res.json(payments);
});

router.post('/payments', async (req, res) => {
    const newPayment = await insertPayment(req.body);
    res.status(201).json(newPayment);
});

router.put('/payments/:id', async (req, res) => {
    const updatedPayment = await updatePayment(req.params.id, req.body);
    res.json(updatedPayment);
});

router.delete('/payments/:id', async (req, res) => {
    const success = await deletePayment(req.params.id);
    success ? res.status(204).end() : res.status(404).json({ error: 'Payment not found' });
});

// CRUD routes for Rental
router.get('/rentals/:id', async (req, res) => {
    const rental = await getRentalByID(req.params.id);
    rental ? res.json(rental) : res.status(404).json({ error: 'Rental not found' });
});

router.get('/rentals', async (req, res) => {
    const rentals = await getAllRentals();
    res.json(rentals);
});

router.post('/rentals', async (req, res) => {
    const newRental = await insertRental(req.body);
    res.status(201).json(newRental);
});

router.put('/rentals/:id', async (req, res) => {
    const updatedRental = await updateRental(req.params.id, req.body);
    res.json(updatedRental);
});

router.delete('/rentals/:id', async (req, res) => {
    const success = await deleteRental(req.params.id);
    success ? res.status(204).end() : res.status(404).json({ error: 'Rental not found' });
});

// CRUD routes for Movie Text
router.get('/movie-texts/:id', async (req, res) => {
    const movieText = await getMovieTextByID(req.params.id);
    movieText ? res.json(movieText) : res.status(404).json({ error: 'Movie text not found' });
});

router.get('/movie-texts', async (req, res) => {
    const movieTexts = await getAllMovieTexts();
    res.json(movieTexts);
});

router.post('/movie-texts', async (req, res) => {
    const newMovieText = await insertMovieText(req.body);
    res.status(201).json(newMovieText);
});

router.put('/movie-texts/:id', async (req, res) => {
    const updatedMovieText = await updateMovieText(req.params.id, req.body);
    res.json(updatedMovieText);
});

router.delete('/movie-texts/:id', async (req, res) => {
    const success = await deleteMovieText(req.params.id);
    success ? res.status(204).end() : res.status(404).json({ error: 'Movie text not found' });
});

// CRUD routes for City
router.get('/cities/:id', async (req, res) => {
    const city = await getCityByID(req.params.id);
    city ? res.json(city) : res.status(404).json({ error: 'City not found' });
});

router.get('/cities', async (req, res) => {
    const cities = await getAllCities();
    res.json(cities);
});

router.post('/cities', async (req, res) => {
    const newCity = await insertCity(req.body);
    res.status(201).json(newCity);
});

router.put('/cities/:id', async (req, res) => {
    const updatedCity = await updateCity(req.params.id, req.body);
    res.json(updatedCity);
});

router.delete('/cities/:id', async (req, res) => {
    const success = await deleteCity(req.params.id);
    success ? res.status(204).end() : res.status(404).json({ error: 'City not found' });
});

// CRUD routes for Country
router.get('/countries/:id', async (req, res) => {
    const country = await getCountryByID(req.params.id);
    country ? res.json(country) : res.status(404).json({ error: 'Country not found' });
});

router.get('/countries', async (req, res) => {
    const countries = await getAllCountries();
    res.json(countries);
});

router.post('/countries', async (req, res) => {
    const newCountry = await insertCountry(req.body);
    res.status(201).json(newCountry);
});

router.put('/countries/:id', async (req, res) => {
    const updatedCountry = await updateCountry(req.params.id, req.body);
    res.json(updatedCountry);
});

router.delete('/countries/:id', async (req, res) => {
    const success = await deleteCountry(req.params.id);
    success ? res.status(204).end() : res.status(404).json({ error: 'Country not found' });
});

// CRUD routes for Language
router.get('/languages/:id', async (req, res) => {
    const language = await getLanguageByID(req.params.id);
    language ? res.json(language) : res.status(404).json({ error: 'Language not found' });
});

router.get('/languages', async (req, res) => {
    const languages = await getAllLanguages();
    res.json(languages);
});

router.post('/languages', async (req, res) => {
    const newLanguage = await insertLanguage(req.body);
    res.status(201).json(newLanguage);
});

router.put('/languages/:id', async (req, res) => {
    const updatedLanguage = await updateLanguage(req.params.id, req.body);
    res.json(updatedLanguage);
});

router.delete('/languages/:id', async (req, res) => {
    const success = await deleteLanguage(req.params.id);
    success ? res.status(204).end() : res.status(404).json({ error: 'Language not found' });
});

// CRUD routes for Admin
router.get('/admins/:id', async (req, res) => {
    const admin = await getAdminByID(req.params.id);
    admin ? res.json(admin) : res.status(404).json({ error: 'Admin not found' });
});

router.get('/admins', async (req, res) => {
    const admins = await getAllAdmins();
    res.json(admins);
});

router.post('/admins', async (req, res) => {
    const newAdmin = await insertAdmin(req.body);
    res.status(201).json(newAdmin);
});

router.put('/admins/:id', async (req, res) => {
    const updatedAdmin = await updateAdmin(req.params.id, req.body);
    res.json(updatedAdmin);
});

router.delete('/admins/:id', async (req, res) => {
    const success = await deleteAdmin(req.params.id);
    success ? res.status(204).end() : res.status(404).json({ error: 'Admin not found' });
});

// CRUD routes for Category
router.get('/categories/:id', async (req, res) => {
    const category = await getCategoryByID(req.params.id);
    category ? res.json(category) : res.status(404).json({ error: 'Category not found' });
});

router.get('/categories', async (req, res) => {
    const categories = await getAllCategories();
    res.json(categories);
});

router.post('/categories', async (req, res) => {
    const newCategory = await insertCategory(req.body);
    res.status(201).json(newCategory);
});

router.put('/categories/:id', async (req, res) => {
    const updatedCategory = await updateCategory(req.params.id, req.body);
    res.json(updatedCategory);
});

router.delete('/categories/:id', async (req, res) => {
    const success = await deleteCategory(req.params.id);
    success ? res.status(204).end() : res.status(404).json({ error: 'Category not found' });
});

// CRUD routes for Movie Actor
router.get('/movie-actors/:actorId/:filmId', async (req, res) => {
    const movieActor = await getMovieActorByIDs(req.params.actorId, req.params.filmId);
    movieActor ? res.json(movieActor) : res.status(404).json({ error: 'Movie actor not found' });
});

router.get('/movie-actors', async (req, res) => {
    const movieActors = await getAllMovieActors();
    res.json(movieActors);
});

router.post('/movie-actors', async (req, res) => {
    const newMovieActor = await insertMovieActor(req.body);
    res.status(201).json(newMovieActor);
});

router.put('/movie-actors/:actorId/:filmId', async (req, res) => {
    const updatedMovieActor = await updateMovieActor(req.params.actorId, req.params.filmId, req.body);
    res.json(updatedMovieActor);
});

router.delete('/movie-actors/:actorId/:filmId', async (req, res) => {
    const success = await deleteMovieActor(req.params.actorId, req.params.filmId);
    success ? res.status(204).end() : res.status(404).json({ error: 'Movie actor not found' });
});

// CRUD routes for Movie Category
router.get('/movie-categories/:filmId/:categoryId', async (req, res) => {
    const movieCategory = await getMovieCategoryByIDs(req.params.filmId, req.params.categoryId);
    movieCategory ? res.json(movieCategory) : res.status(404).json({ error: 'Movie category not found' });
});

router.get('/movie-categories', async (req, res) => {
    const movieCategories = await getAllMovieCategories();
    res.json(movieCategories);
});

router.post('/movie-categories', async (req, res) => {
    const newMovieCategory = await insertMovieCategory(req.body);
    res.status(201).json(newMovieCategory);
});

router.put('/movie-categories/:filmId/:categoryId', async (req, res) => {
    const updatedMovieCategory = await updateMovieCategory(req.params.filmId, req.params.categoryId, req.body);
    res.json(updatedMovieCategory);
});

router.delete('/movie-categories/:filmId/:categoryId', async (req, res) => {
    const success = await deleteMovieCategory(req.params.filmId, req.params.categoryId);
    success ? res.status(204).end() : res.status(404).json({ error: 'Movie category not found' });
});

module.exports = router;


router.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
