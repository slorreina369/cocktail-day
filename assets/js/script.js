// global variables
var searchFormEl = document.querySelector("#search-form")
var ingredInputEl = document.querySelector("#ingred-name")
var resultsArea = document.querySelector("#results-area")


// handle submit event
var formSubmitHandler = function (event) {
    event.preventDefault();
    var ingredName = ingredInputEl.value.trim()
    if (ingredName) {
        getCocktailData(ingredName)
        // clear old content
        ingredInputEl.value = "";
        resultsArea.textContent = "";
    } else {
        alert("Please enter an ingredient.")
    }
};

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

searchFormEl.addEventListener("submit", formSubmitHandler)