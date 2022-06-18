
/*// global variables for search
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

            //relocated this window location inside this function to prevent 'failed to fetch' error
            // might have to move it inside the if statements after cocktail functions are ready
            window.location = "./recommendation.html"

            // after getting the weather info if statements decide which group of cocktails to display from
            if (currentTemp < 60) {
                //hotDrinks();
            } else if (currentTemp < 80) {
                //normalDrinks();
            } else {
                //coldDrinks();
            }

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
var getCocktailData = function (ingredName) {
    var apiUrl = `https://api.api-ninjas.com/v1/cocktail?ingredients=${ingredName}`
    fetch(apiUrl, {
        method: "GET",
        headers: { 'X-Api-Key': '31T9JplSy3SJ+yCq4xnfQA==VH9mNehgzi2IYKIV' },
        contentType: 'application/json'
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayCocktailData(ingredName, data)
                })
            }
        })
};

// display the data (passed from getCocktailData)
var displayCocktailData = function (ingredName, data) {
    console.log(data)

    var ingredNameEl = document.createElement("h3")
    ingredNameEl.textContent = `Results for: ${ingredName}`
    resultsArea.appendChild(ingredNameEl)

    var cocktailListEl = document.createElement("ol")
    cocktailListEl.classList = "cocktail-list"
    resultsArea.appendChild(cocktailListEl)

    for (var i = 0; i < data.length; i++) {
        var cocktailEl = document.createElement("li")
        cocktailEl.classList = "cocktail-name"
        cocktailEl.textContent = data[i].name

        var ingredOutputEl = document.createElement("p")
        ingredOutputEl.classList = "ingredients"
        ingredOutputEl.textContent = data[i].ingredients

        var instructEl = document.createElement("p")
        instructEl.classList = "instructions"
        instructEl.textContent = data[i].instructions

        cocktailEl.appendChild(ingredOutputEl)
        cocktailEl.appendChild(instructEl)
        cocktailListEl.appendChild(cocktailEl)
    }
};*/



///////////////////////////////////////////////////////////////////////////

//How to enhance drinkFinder() Psuedo Code Special

//1. Create an array of search words for each branch of magicWord()

//2. have drinkFinder() run through the appropriate array from magicWord() and make an api call for each index of that array.

//3. concatenate all generated arrays from drinkFinder() and select a random index of the new super array







const temp = 89

//function to request list of drinks with the magicWord() in its ingredients
function drinkFinder() {

   
    var getCocktailData = function (ingredName) {
        var ingredName= magicWord()
        for(i=0; i<ingredName.length; i++){
            console.log(ingredName[i])
            var apiUrl = `https://api.api-ninjas.com/v1/cocktail?ingredients=${ingredName[i]}`
            fetch(apiUrl, {
                method: "GET",
                headers: { 'X-Api-Key': '31T9JplSy3SJ+yCq4xnfQA==VH9mNehgzi2IYKIV' },
                contentType: 'application/json'
            })
                .then(function(response){
                    if(response.ok) {
                        response.json().then(function(data){
                        console.log(data);
                        
                        var index = data[Math.floor(Math.random()*data.length)];
                        console.log(index.name);
                        document.getElementById("cocktail-name").textContent= index.name.toUpperCase()
                            
                                                 
                    })
                };
            })
        };
    };
        
    getCocktailData()

};

drinkFinder()

//function to change the word that we search the json data with determined by temp
function magicWord(){
    if(temp>80){
        hotWeatherSearch=["ice","chilled","cold"]
        return hotWeatherSearch
    }

    if(temp<=80 && temp>=60){
        midWeatherSearch=["garnish"]
        return midWeatherSearch
    }

    if(temp<60){
        coldWeatherSearch=[" hot", "coffee"]
        return coldWeatherSearch
    }
};
console.log(magicWord());

function appendCocktailName(){
    document.getElementById("cocktail-name").textContent= index.name
}

//searchButtonEl.addEventListener("click", formSubmitHandler)

