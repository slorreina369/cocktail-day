
// global variables for search
var searchButtonEl = document.querySelector(".search-btn")

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

    // relocated window.location to line 93 because of a 'failed to fetch' error
    if (locateArray) {
        getLatLon(locateArray[0], locateArray[1], "")        
        // clear old content
        searchInputEl.value = "";
    } else {
        alert("Please enter an ingredient.")
    }
    
};

// search will run this function first to grab the locations lat and lon
function getLatLon(city, state, country) {
    let geocodeApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${apiKey}`

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
            getCocktailData();
        })
        .catch(function (error) {
            console.log(error);
        })
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

// pass search criteria to API
var getCocktailData = function () {
    var ingredName = "ice"
    var apiUrl = `https://api.api-ninjas.com/v1/cocktail?ingredients=${ingredName}`
    fetch(apiUrl, {
        method: "GET",
        headers: { 'X-Api-Key': '31T9JplSy3SJ+yCq4xnfQA==VH9mNehgzi2IYKIV' },
        contentType: 'application/json'
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    localStorage.setItem("cocktail", JSON.stringify(data[0].name))
                    window.location = "./recommendation.html"
                })
            }
        })
};
    



///////////////////////////////////////////////////////////////////////////


//const currentTemp = 70

//function to request list of drinks with the magicWord() in its ingredients
async function drinkFinder() {


    var getCocktailData = async function (ingredName) {
        var ingredName = magicWord()

        return Promise.all(ingredName.map(async (name) => {
            var apiUrl = `https://api.api-ninjas.com/v1/cocktail?ingredients=${name}`
            const result = await fetch(apiUrl, {
                method: "GET",
                headers: { 'X-Api-Key': '31T9JplSy3SJ+yCq4xnfQA==VH9mNehgzi2IYKIV' },
                contentType: 'application/json'
            }).then(response => response.json());
            return result;
        }))

    };

    //function to get one random drink from the superArray and append the cocktail name
    function getIndex(superArray) {
        var randoArray = superArray[Math.floor(Math.random() * superArray.length)];
        console.log(superArray);
        console.log(randoArray)
        var index = randoArray[Math.floor(Math.random() * randoArray.length)]
        console.log(index)
        document.getElementById("cocktail-name").textContent = index.name.toUpperCase();
    }
    const cocktails = await getCocktailData();
    getIndex(cocktails);

};

drinkFinder()

//function to change the word that we search the json data with determined by temp
function magicWord() {
    if (currentTemp > 80) {
        hotWeatherSearch = ["ice", "chilled", "cold"]
        return hotWeatherSearch
    }

    if (currentTemp <= 80 && currentTemp >= 60) {
        midWeatherSearch = ["garnish", "glass", "shake", "blend"]
        return midWeatherSearch
    }

    if (currentTemp < 60) {
        coldWeatherSearch = [" hot", "coffee", "cinnamon"]
        return coldWeatherSearch
    }
};
console.log(magicWord());

function appendCocktailName() {
    document.getElementById("cocktail-name").textContent = index.name
}

searchButtonEl.addEventListener("click", formSubmitHandler)

