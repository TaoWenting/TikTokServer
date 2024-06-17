require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Add this line to import the path module
const app = express();
const port = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware to handle JSON requests
app.use(bodyParser.json());

// Enable CORS and configure it
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specified methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specified headers
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use(express.json());

// Serve static files from the videosSave directory
app.use('/videosSave', express.static(path.join(__dirname, 'videosSave')));

// Use routes
app.use('/api/videos', videoRoutes);
app.use('/auth', authRoutes);
app.use(userRoutes);  // Ensure this is included

// Serve static files (e.g., for the public folder)
app.use(express.static('public'));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
