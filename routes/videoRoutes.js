const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', videoController.getAllVideos);
router.get('/public', videoController.getAllPublicVideos);
router.post('/upload', authMiddleware, upload.single('video'), videoController.uploadVideo);
router.post('/set-privacy/:videoId', authMiddleware, videoController.setVideoPrivacy);

module.exports = router;

