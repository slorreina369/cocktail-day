let loadedTemp = "";
let loadedConditions = "";
let loadedWeatherIcon = "";

// variables to save cocktail
let savedCocktail = "";
let savedIngred = "";
let savedInstructions = "";
let cocktailInfo = [];

function loadWeather() {
    let loadedWeather = JSON.parse(localStorage.getItem("weather"))

    loadedTemp = loadedWeather[0];
    loadedConditions = loadedWeather[1];
    loadedWeatherIcon = loadedWeather[2];

    document.querySelector("#temp").textContent = loadedTemp;
    document.querySelector("#conditions").textContent = loadedConditions;
    document.querySelector("#icon").innerHTML = "<img src='http://openweathermap.org/img/wn/" + loadedWeatherIcon + "@2x.png' alt='conditions'>"
}

function getCocktailImage(name) {
    let loadedCocktail = name
    let apiUrl = `https://bing-image-search1.p.rapidapi.com/images/search?q=cocktail%20%2B%20recipe%20%2B%20%22${loadedCocktail}&count=1&mkt=en-US`

    fetch(apiUrl, {
        method: "GET",
        headers: {
            'X-RapidAPI-Key': '7df2415608mshf6be38a9814c3b3p14bd14jsncc475252c4dd',
            'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
        },
        contentType: 'application/json'
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    let imageReplace = document.getElementById("cocktail-image");
                    imageReplace.src = data.value[0].contentUrl;
            })
        }
    })
};


//function to request list of drinks with the magicWord() in its ingredients
async function drinkFinder() {

    var getCocktailData = async function (ingredName) {
        var choices = JSON.parse(localStorage.getItem("choices"))
        choices = choices[Math.floor(Math.random() * choices.length)]
        var ingredName = [magicWord(), choices]
        console.log("ingredients: ", ingredName)

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
        var index = randoArray[Math.floor(Math.random() * randoArray.length)]

        // saving cocktail info to local storage
        savedCocktail = index.name;
        savedIngred = index.ingredients;
        savedInstructions = index.instructions;
        cocktailInfo = [savedCocktail, savedIngred, savedInstructions]
        localStorage.setItem("cocktail", JSON.stringify(cocktailInfo))
        document.getElementById("cocktail-name").textContent = index.name.toUpperCase();
        cocktailNameEl = index.name.toUpperCase();
        getCocktailImage(cocktailNameEl);
    }
    const cocktails = await getCocktailData();
    getIndex(cocktails);
};

//function to change the word that we search the json data with determined by temp
function magicWord() {
    if (loadedTemp > 80) {
        hotWeatherSearch = ["ice", "chilled", "cold"]
        return hotWeatherSearch[Math.floor(Math.random() * hotWeatherSearch.length)]
    }

    if (loadedTemp <= 80 && loadedTemp >= 60) {
        midWeatherSearch = ["garnish", "glass", "shake", "blend"]
        return midWeatherSearch[Math.floor(Math.random() * midWeatherSearch.length)]
    }

    if (loadedTemp < 60) {
        coldWeatherSearch = [" hot"]
        return coldWeatherSearch[Math.floor(Math.random() * coldWeatherSearch.length)]
    }
};

function appendCocktailName() {
    document.getElementById("cocktail-name").textContent = index.name
}



loadWeather();
drinkFinder();