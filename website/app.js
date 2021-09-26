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
    const response = await fetch(baseURL + city + key);
    // save that response as a json file
    const data = await response.json();

}
// test


// main functions