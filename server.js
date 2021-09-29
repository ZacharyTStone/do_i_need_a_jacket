// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require("express");
// make a variable to run express as a function
const app = express();

// Start up an instance of app

// choose a port
const PORT = process.env.PORT || 3000;
// use express to listen to that port and run a console log if successful
app.listen(PORT, function () {
    console.log("Server is a runnin on port " + PORT);
})

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));


// Setup Server

// when the app.js makes a post request
app.post("/add", (req, res) => {
    const entry = req.body;
    projectData.push(entry);
    res.json(projectData);
    console.log(projectData)
});

// send that data back to the app.js file when requested
app.get("/server_data", (req, res) => {
    res.send(projectData);
    console.log("sent project data back to the app.js file");
})