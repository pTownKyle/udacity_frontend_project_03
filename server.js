// Get Environment Variables
require('dotenv').config();

// Get Dependencies
const express = require('express');
const cors = require('cors');

// Initialize Express
const app = express();

// Set up CORS
app.use(cors());

// Set up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up Express to serve static files
app.use(express.static('public'));

// Set up Express to listen on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
