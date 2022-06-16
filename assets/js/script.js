let apiKey = "ffe65789d16418b39e33722ce53e0bb8"
let geocodeApi = `http://api.openweathermap.org/geo/1.0/direct?q=portland&appid=${apiKey}`

let locationName = "";
let lon = "";
let lat = "";

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
        lat = data[0].lat;
        lon = data[0].lon;
        

        console.log(`lat: ${lat}, lon: ${lon}`)

        getWeather();
    })
    .catch(function(error) {
        console.log(error);
    })
}

function getWeather() {
    let weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=imperial`

    fetch(weatherApiUrl)
    .then(function(response) {
        if (!response.ok) {
            console.log(response.json())
            alert("failed to fetch weather data")
        }

        return response.json();
    })
    .then(function(data) {
        console.log(data.current.temp);
        console.log(data.current.weather[0].description)

        let 
    })
    .catch(function(error) {
        console.log(error);
    })
}


getLatLon();