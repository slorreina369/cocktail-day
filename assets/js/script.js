let apiKey = "ffe65789d16418b39e33722ce53e0bb8"
let geocodeApi = `http://api.openweathermap.org/geo/1.0/direct?q=portland&appid=${apiKey}`

let locationName = "";
let locationLat = "";
let locationLon = "";

let currentTemp = "";
let currentWeather = "";
let weatherIcon = "";
let weatherInfo = [];

function getLatLon(city, state, country) {

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
        
        if (currentTemp < 60) {
            hotDrinks();
        } else if (currentTemp < 80) {
            normalDrinks();
        } else {
            coldDrinks();
        }

    })
    .catch(function(error) {
        console.log(error);
    })
}


getLatLon();