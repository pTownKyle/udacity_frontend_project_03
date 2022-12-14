// Get Dependencies
const express = require('express');
const cors = require('cors');

// Setup Project Data
const projectData = {};

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
    res.json(projectData);
});

// Post Data Route
app.post('/data', (req, res) => {
    let data = req.body;
    projectData.temp = data.temp;
    projectData.date = data.date;
    projectData.feelings = data.feelings;
    res.end();
});

// Express listen on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
