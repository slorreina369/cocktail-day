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



function getCocktailImage() {
    let loadedCocktail = JSON.parse(localStorage.getItem("cocktail"))
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
                    console.log(data.value[0].contentUrl);
                    let imageReplace = document.getElementById("cocktail-image");
                    imageReplace.src = data.value[0].contentUrl;
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
    if (loadedTemp > 80) {
        hotWeatherSearch = ["ice", "chilled", "cold"]
        return hotWeatherSearch
    }

    if (loadedTemp <= 80 && loadedTemp >= 60) {
        midWeatherSearch = ["garnish", "glass", "shake", "blend"]
        return midWeatherSearch
    }

    if (loadedTemp < 60) {
        coldWeatherSearch = [" hot", "coffee", "cinnamon"]
        return coldWeatherSearch
    }
};
console.log(magicWord());

function appendCocktailName() {
    document.getElementById("cocktail-name").textContent = index.name
}

loadWeather();
getCocktailImage();