let loadedTemp = "";
let loadedConditions = "";
let loadedWeatherIcon = "";

function loadWeather() {
    let loadedWeather = JSON.parse(localStorage.getItem("weather"))
    console.log(`temp: ${loadedWeather[0]}`)
    console.log(`conditions: ${loadedWeather[1]}`)
    console.log(`icon code: ${loadedWeather[2]}`)

    loadedTemp = loadedWeather[0];
    loadedConditions = loadedWeather[1];
    loadedWeatherIcon = loadedWeather[2];

    document.querySelector("#temp").textContent = loadedTemp;
    document.querySelector("#conditions").textContent = loadedConditions;
    document.querySelector("#icon").innerHTML = "<img src='http://openweathermap.org/img/wn/" + loadedWeatherIcon + "@2x.png' alt='conditions'>"
}

loadWeather();