Video Sharing Backend
A backend server for a video sharing platform using Node.js, Express, and local JSON database.

Project Overview
This project provides a backend server for a video sharing platform. It allows users to authenticate, upload videos, like/dislike videos, and manage their profiles. The backend uses Express.js for handling HTTP requests, json-server for storing video data locally in a JSON file (db.json), JWT (JSON Web Tokens) for authentication, and dotenv for managing environment variables.

# Clone the repository
git clone https://github.com/yourusername/video-sharing-backend.git

# Navigate into the project directory
cd video-sharing-backend

# Install dependencies
npm install

Setting up Environment Variables
Create a .env file in the root of your project.

Add the following variables to your .env file:
SECRET_KEY=your_actual_secret_key
Replace your_actual_secret_key with a secure secret key for JWT token signing.
or in the  middlewares/authMiddleware.js
const secretKey = 'Replace with your actual secret key';  // Replace with your actual secret key

Note: Ensure that you keep your .env file secure and never expose it in version control systems.

Usage
To start the server locally:
node server.js

The server will run on http://localhost:5000.
API Documentation
The API provides endpoints for user authentication, video management, and profile management. Here are some of the endpoints:

POST /api/auth/login: Login endpoint for users.
POST /api/auth/register: Register new users.
GET /api/videos: Get a list of videos.
POST /api/videos: Upload a new video.
POST /api/videos/:id/like: Like a video.
For detailed API documentation, refer to the API documentation file or explore the codebase.

Deployment
For deployment to a production environment:

Set up a production-ready database (e.g., MongoDB, PostgreSQL).
Configure production environment variables in .env.
Deploy using a platform like Heroku, AWS, or DigitalOcean.
Built With
Node.js - JavaScript runtime environment
Express - Web application framework for Node.js
json-server - Local JSON database server
JWT - JSON Web Tokens for authentication
dotenv - Environment variable management
Contributing
Contributions are welcome! Here's how you can contribute:

Report bugs or issues
Submit feature requests
Fork the repository, create a pull request
License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
Thanks to JSON Server for providing a simple and effective way to mock a REST API with a local JSON file.
Inspiration and initial structure from various open-source projects and tutorials.