
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
};



//1.use magicWord() to determine if we are trying to find a drink that is served hot or cold

//2.use findWord() to find the word in the data array and save the index number

//3.use _______() to randomize the saved index numbers and choose one to display.







const temp = 52

//function to request list of drinks with the word hot in its preparded instructions
function hot() {

   // if(temp>80){
        var getCocktailData = function (ingredName) {
            var ingredName= magicWord()
            var apiUrl = `https://api.api-ninjas.com/v1/cocktail?ingredients=${ingredName}`
            fetch(apiUrl, {
                method: "GET",
                headers: { 'X-Api-Key': '31T9JplSy3SJ+yCq4xnfQA==VH9mNehgzi2IYKIV' },
                contentType: 'application/json'
            })
                .then(function(response){
                    if(response.ok) {
                        response.json().then(function(data){
                            console.log(data);                       
                        })
                    };
                })
        };
        
        getCocktailData()
   // }

};

hot()

//function to request a list of normal drinks 
function mid() {

    if(temp<80 && temp>60){
        var getCocktailData = function (ingredName) {
            var apiUrl = `https://api.api-ninjas.com/v1/cocktail?ingredients=${ingredName}`
            fetch(apiUrl, {
                method: "GET",
                headers: { 'X-Api-Key': '31T9JplSy3SJ+yCq4xnfQA==VH9mNehgzi2IYKIV' },
                contentType: 'application/json'
            });
        };

        getCocktailData()
    }
};

//function to request list of drinks with the word chilled or very cold in its preparded instructions
function cold() {

    if(temp<60){
        var getCocktailData = function (ingredName) {
            var apiUrl = `https://api.api-ninjas.com/v1/cocktail?ingredients=${ingredName}`
            fetch(apiUrl, {
                method: "GET",
                headers: { 'X-Api-Key': '31T9JplSy3SJ+yCq4xnfQA==VH9mNehgzi2IYKIV' },
                contentType: 'application/json'
            });
        };

        getCocktailData()
    }
};

//function to search the json data from the api for a specific word
function findWord() {
    for( i=0; i<data.length; i++){
        var searchFor = magicWord();
        console.log(data.instructions.filter((item) => {
        return item.toLowerCase().split(" ").indexOf(searchFor.toLowerCase()) != -1
    }));};
};

//function to change the word that we search the json data with determined by temp
function magicWord(){
    if(temp>80){
        return "very cold"
    }

    if(temp<=80 && temp>=60){
        return "room temparature"
    }

    if(temp<60){
        return "hot"
    }
    console.log(magicWord());
};
console.log(magicWord());

searchButtonEl.addEventListener("click", formSubmitHandler)

