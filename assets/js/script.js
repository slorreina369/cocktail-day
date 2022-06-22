
// global variables for search
var searchButtonEl = document.querySelector(".search-btn")
var optionButtonEl = document.querySelector(".option-btn")

// variables for location info
let apiKey = "ffe65789d16418b39e33722ce53e0bb8"
let locationName = "";
let locationState = "";
let locationCountry = "";
let locationLat = "";
let locationLon = "";


//variables and array for all weather related info
let currentTemp = "";
let currentWeather = "";
let weatherIcon = "";
let weatherInfo = [];

// *** potential variables for bells and whistles
// var ingredInputEl = document.querySelector("#ingred-name")
// var resultsArea = document.querySelector("#results-area")

// handle submit event
function formSubmitHandler(event) {
    event.preventDefault();
    var searchInputEl = document.querySelector("#search-city")
    var locateArray = searchInputEl.value.split(/[ ,]+/);

    if (locateArray) {
        getLatLon(locateArray[0], locateArray[1], "")
        // clear old content
        searchInputEl.value = "";
    } else {
        alert("Please enter an ingredient.")
    }
};

function optionHandler(event) {
    event.preventDefault();
    var modal = document.querySelector("#option-modal");
    modal.style.display = "block";

    var span = document.querySelector(".close")
    span.onclick = function () {
        modal.style.display = "none"
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

// Modal for liquor options
    var modalButtonEl = document.querySelector(".confirm-option")
    modalButtonEl.onclick = function () {
        var OptionListEl = document.querySelector(".options-list")
        var choiceArray = []

        for (var i = 0; i < OptionListEl.children.length; i++) {
            if (OptionListEl.children[i].children[0].type == "checkbox") {
                if (OptionListEl.children[i].children[0].checked == true) {
                    choiceArray.push(OptionListEl.children[i].children[0].value);
                }
            }
        }
        console.log(choiceArray)
        localStorage.setItem("choices", JSON.stringify(choiceArray))
        modal.style.display = "none"

    }
};

// search will run this function first to grab the locations lat and lon
function getLatLon(city, state, country) {
    let geocodeApi = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${apiKey}`

    fetch(geocodeApi)
        .then(function (response) {
            if (!response.ok) {
                console.log(response.json())
                alert("failed to fetch weather data")
            }

            return response.json();
        })
        .then(function (data) {
            locationName = data[0].name;
            locationState = data[0].state;
            locationCountry = data[0].country;
            locationLat = data[0].lat;
            locationLon = data[0].lon;

            // after getting the lat and lon this function runs a fetch request to get the actual weather
            getWeather();
        })
        .catch(function (error) {
            console.log(error);
        })
}

function getWeather() {
    let weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${locationLat}&lon=${locationLon}&exclude={part}&appid=${apiKey}&units=imperial`
    fetch(weatherApiUrl)
        .then(function (response) {
            if (!response.ok) {
                console.log(response.json())
                alert("failed to fetch weather data")
            }

            return response.json();
        })
        .then(function (data) {
            console.log(data.current.temp);
            console.log(data.current.weather[0].description)
            console.log(data.current.weather[0].icon)

            currentTemp = data.current.temp;
            currentWeather = data.current.weather[0].description;
            weatherIcon = data.current.weather[0].icon;

            weatherInfo = [currentTemp, currentWeather, weatherIcon];

            localStorage.setItem("weather", JSON.stringify(weatherInfo))

            // after getting the weather info if statements decide which group of cocktails to display from
            if (currentTemp < 60) {
                //hotDrinks();
            } else if (currentTemp < 80) {
                //normalDrinks();
            } else {
                //coldDrinks();
            }
            window.location = "./recommendation.html"
        })
        .catch(function (error) {
            console.log(error);
        })
}



searchButtonEl.addEventListener("click", formSubmitHandler)
optionButtonEl.addEventListener("click", optionHandler)