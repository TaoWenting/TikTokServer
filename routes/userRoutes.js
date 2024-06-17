const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getUserVideos } = require('../controllers/videoController');

// Define the route to get user-specific videos
router.get('/users/:userId/videos', authMiddleware, getUserVideos);

module.exports = router;