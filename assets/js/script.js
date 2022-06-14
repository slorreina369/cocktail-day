var searchFormEl = document.querySelector("#search-form");
var ingredInputEl = document.querySelector("#ingred-name");


// handle submit event
var formSubmitHandler = function (event) {
    event.preventDefault();
    var ingredName = ingredInputEl.value.trim();
    if (ingredName) {
        getCocktailData(ingredName)
        // clear old content
        ingredInputEl.value = '';
    } else {
        alert("Please enter an ingredient.");
    }
};

// pass search criteria to API
var getCocktailData = function (ingredName) {
    var apiUrl = `https://api.api-ninjas.com/v1/cocktail?name=${ingredName}`
    fetch(apiUrl, {
        method: "GET",
        headers: { 'X-Api-Key': '31T9JplSy3SJ+yCq4xnfQA==VH9mNehgzi2IYKIV' },
        contentType: 'application/json'
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                })
            }
        })
}

searchFormEl.addEventListener("submit", formSubmitHandler)