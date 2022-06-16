let apiKey = "ffe65789d16418b39e33722ce53e0bb8"

// variables for location info
let locationName = "";
let locationLat = "";
let locationLon = "";

// variables and array for all weather related info
let currentTemp = "";
let currentWeather = "";
let weatherIcon = "";
let weatherInfo = [];


// search will run this function first to grab the locations lat and lon
function getLatLon(city, state, country) {
    let geocodeApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${apiKey}`

    fetch(geocodeApi)
    .then(function(response) {
        if (!response.ok) {
            console.log(response.json())
            alert("failed to fetch weather data")
        }

        return response.json();
    })
    .then(function(data) {
        locationName = data[0].name;
        locationLat = data[0].lat;
        locationLon = data[0].lon;
        

        console.log(`lat: ${locationLat}, lon: ${locationLon}`)

        // after getting the lat and lon this function runs a fetch request to get the actual weather
        getWeather();
    })
    .catch(function(error) {
        console.log(error);
    })
}

function getWeather() {
    let weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${locationLat}&lon=${locationLon}&exclude={part}&appid=${apiKey}&units=imperial`

    fetch(weatherApiUrl)
    .then(function(response) {
        if (!response.ok) {
            console.log(response.json())
            alert("failed to fetch weather data")
        }

        return response.json();
    })
    .then(function(data) {
        console.log(data)
        console.log(data.current.temp);
        console.log(data.current.weather[0].description)
        console.log(data.current.weather[0].icon)

        currentTemp = data.current.temp;
        currentWeather = data.current.weather[0].description;
        weatherIcon = data.current.weather[0].icon;

        weatherInfo = [currentTemp, currentWeather, weatherIcon];
        
        // after getting the weather info if statements decide which group of cocktails to display from
        if (currentTemp < 60) {
            //hotDrinks();
        } else if (currentTemp < 80) {
            //normalDrinks();
        } else {
            //coldDrinks();
        }

    })
    .catch(function(error) {
        console.log(error);
    })
}

// calling the starting function just for texting purposes. We can attach this function to the search button to get everything started.
getLatLon();