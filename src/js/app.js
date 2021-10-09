/* Global Variables */
// API URL/Key
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
// in metric and then converted to farenheit later
const APIKey = ",us&units=metric&appid=f0e2f2fd5311df4ea9bdff1d071ad35e";
// Create a new date instance dynamically with JS
let d = new Date();
// months start at 0 in computer land
let newDate = (d.getMonth() + 1) + "." + d.getDate() + "." + d.getFullYear();

// DOM Elements

// content
const locationDiv = document.getElementById("location")
const dateDiv = document.getElementById("date");
const temperatureDiv = document.getElementById("temp");
const generateButton = document.getElementById("generate");
const entryDiv = document.querySelector("entry");
const humidityDiv = document.getElementById("humidity");
const weatherDiv = document.getElementById("weather");
const iconDiv = document.getElementById("icon");
// feeling Div to give the entered text to the  server
const clothingtDiv = document.getElementById("clothing");


// helper functions

// Get weather info from API

async function getWeatherData(baseURL, zipcode, APIKey) {
    // makes a fetch request to the api url and saves the response (await means it doesn"t move on till it is complete)
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
            humidity: data.main.humidity,
            feelslike: data.main.feelslike,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
        };

    } catch (error) {
        console.log("Error. Could not return data JSON file", error);
    };

};

// POST weather data to server.js
async function postData(url = "", data = {}) {
    // awaits the url to be fetched and saves everything as the response to give to the server
    const res = await fetch(url, {
        // POST Method
        method: "POST",
        // default value (not safe)
        credentials: "same-origin",
        // what will be posted
        headers: {
            "Content-Type": "application/json"
        },
        // what the body that the server.js will read
        body: JSON.stringify(data)
    });
    try {
        // try to return the response 
        const getData = await res.json();
        return getData;
    } catch {
        console.log("Error:could not post anything to server.js");
    };
};

// GET the data back from the server.js
async function useServerData() {
    // remove past info
    dateDiv.innerHTML = "";
    locationDiv.innerHTML = "";
    temperatureDiv.innerHTML = "";
    humidityDiv.innerHTML = "";
    weatherDiv.innerHTML = "";
    iconDiv.innerHTML = "";
    clothingtDiv.innerHTML = "";

    const req = await fetch('/server_data');

    try {
        // weather info
        let Data = await req.json();
        // dataLenght makes so the data that is added is only the latest object (count starts at 0)
        let dataLength = (Data.length) - 1;
        let data = Data[dataLength].data;
        let mood = Data[dataLength].mood;
        let fahrenheit = Math.floor(data.temp * 1.8) + 32;
        // update UI
        // add date
        dateDiv.innerHTML = "</br>" + newDate;
        // clothing check 
        clothingCheck(fahrenheit);
        // add geography 
        locationDiv.innerHTML = ("<br><br><h3> the weather in " + data.city + "," + data.country + " is: </h3> </br> ");
        // Jacket info
        temperatureDiv.innerHTML = "<p>" + data.temp + " degrees celsius or " + fahrenheit + " degrees fahrenheit. </p";
        // add humidity
        humidityDiv.innerHTML = "<p> The humidity is " + data.humidity + "%. </p>"
        // weather info
        weatherDiv.innerHTML = "<p> It looks like we have " + data.description + " today. </p>";
        iconDiv.innerHTML = "<img src=" + "'http://openweathermap.org/img/wn/" + data.icon + "@2x.png'>";
        // }
    } catch (error) {
        console.log("couldn't get the data back from the server", error);
        alert('City/State not found');
    };

}

function coatCheck(farenheitTemp) {
    if (farenheitTemp <= 25) {
        return true;
    }
}

function jacketCheck(farenheitTemp) {
    if (farenheitTemp > 25 || farenheitTemp < 44) {
        return true;
    }
}

function tshirtCheck(farenheitTemp) {
    if (farenheitTemp >= 44) {
        return true;
    }
}

function clothingCheck(farenheitTemp) {
    if (tshirtCheck(farenheitTemp) === true) {
        clothingtDiv.innerHTML = "<h3> Nope! </h3> <p> You'll be fine with a tshirt today! </p>"
    } else if (jacketCheck(farenheitTemp) === true) {
        clothingtDiv.innerHTML = "<h3> YES! </h3> <p> Better grab a jacket! </p> "
    } else if (coatCheck(farenheitTemp) === true) {
        clothingtDiv.innerHTML = "<h3> No! </h3> <p> A jacket just won't cut it this time. It's coat weather! </p"
    }

}

// test


// main functions

generateButton.addEventListener("click", runProgram);

function runProgram() {
    // test zip code
    let enteredZipcode = document.getElementById('zip').value;
    // text feelings form
    // const form = document.getElementById("feelings").value;
    if (enteredZipcode.length !== 5) {
        alert("please enter a 5 digit US zipcode")
    }
    // } else if (form == "") {
    //     alert("Please describe your mood today.");
    //     return false;
    else {
        // get the feelings info
        // const feelings = document.getElementById('feelings').value;
        // post the weather to the server
        getWeatherData(baseURL, enteredZipcode, APIKey).then(data => {
            postData("/add", {
                // weather data
                data: data,
                // entered feelings section
                // mood: feelings,
            });
            // get the server data back and use it
            useServerData();
        });
    }
}