const express = require('express');
const { register, login, authorize } = require('./controllers/auth');
const { getLocations, addLocation } = require('./controllers/locations');
const { getAllBikes, updateBike, addBike, getUserBike, setUserBike, removeUserBike } = require('./controllers/bikes');
const { getAllReports, submitReport } = require('./controllers/reports');

const router = express.Router();

// auth routes
router.post('/register', register);
router.post('/login', login);

// location routes
router.get('/locations', authorize(), getLocations);
router.post('/locations', authorize('admin'), addLocation);

// bike routes
router.get('/bikes', authorize('admin'), getAllBikes);
router.patch('/bikes', authorize('admin'), updateBike);
router.post('/bikes', authorize('admin'), addBike);
router.get('/bike', authorize('customer'), getUserBike);
router.patch('/bike', authorize('customer'), setUserBike);
router.delete('/bike', authorize('customer'), removeUserBike);

// reports routes
router.get('/reports', authorize('admin'), getAllReports);
router.post('/reports', authorize('customer'), submitReport);

module.exports = router;