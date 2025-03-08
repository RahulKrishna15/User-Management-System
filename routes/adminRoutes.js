const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Admin dashboard
router.get('/dashboard', authMiddleware, adminMiddleware, adminController.getDashboard);

// Add user form
router.get('/add-user', authMiddleware, adminMiddleware, adminController.getAddUserForm);

// Add new user
router.post('/users', authMiddleware, adminMiddleware, adminController.addUser);

// Get all users
router.get('/users', authMiddleware, adminMiddleware, adminController.getAllUsers);

module.exports = router;
