// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = process.env.PORT || 3030;
const server = app.listen(port, listening);

function listening() {
    console.log(`running on localhost: ${port}`);
};

// recieve from client side
app.post('/add', addRecord);

function addRecord(req, res) {

    newEntry = {
        date: req.body.date,
        city: req.body.city,
        temperature: req.body.temperature,
        feel: req.body.feel
    }

    projectData = newEntry
}
// GET route
app.get('/get', sendData);

function sendData(req, res) {
    res.send(projectData);
};