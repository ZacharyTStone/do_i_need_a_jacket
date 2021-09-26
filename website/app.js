/* Global Variables */
// API URL/Key
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const APIKey = "&appid=f0e2f2fd5311df4ea9bdff1d071ad35e";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// helper functions

// Get weather info from API

async function getWeatherData(baseURL, zipcode, APIKey) {
    // makes a fetch request to the api url and saves the response (await means it doesn't move on till it is complete)
    const response = await fetch(baseURL + zipcode + APIKey);
    // save that response as a json file
    const data = await response.json();
    // then tries to return that data to be used in the web app and catches if it doesnt work
    try {
        console.log("returned the data from the data JSON");

        return {
            // uses the json file and finds some data from that using dot notation
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            description: data.weather[0].description,
        };

    } catch (error) {
        console.log("Error. Could not return data JSON file", error);
    };

};


// test


// main functions

getWeatherData(baseURL, 19128, APIKey);