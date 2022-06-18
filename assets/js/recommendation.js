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

loadWeather();
getCocktailImage();