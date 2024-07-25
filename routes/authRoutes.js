const express = require('express');
const router = express.Router();
const { loginUser, registerUser, changePassword } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


// Route for user login
router.post('/login', loginUser);

// Route for user registration
router.post('/register', registerUser);

// Route for changing password
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;
