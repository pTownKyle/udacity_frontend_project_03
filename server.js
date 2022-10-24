// Get Environment Variables, Setup Weather API Key & Project Data
require('dotenv').config();
const api_key = process.env.WEATHER_API_KEY;
const projectData = {};

// Get Dependencies
const express = require('express');
const cors = require('cors');

// Initialize Express
const app = express();

// Express use CORS
app.use(cors());

// Express parse URL encoded data & JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express serve static files
app.use(express.static('public'));

// Routes

// Get Data Route
app.get('/data', (req, res) => {
    res.send(projectData);
});

// Post Data Route
app.post('/data', (req, res) => {
    let data = req.body;
    projectData.temp = data.temp;
    projectData.date = data.date;
    projectData.userResponse = data.userResponse;
});

// Express listen on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
