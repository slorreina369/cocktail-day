let cocktailName = "";
let cocktailIngredients = "";
let cocktailInstructions = "";

function loadCocktailRecipe () {
    let loadedCocktail = JSON.parse(localStorage.getItem("cocktail"));
    cocktailName = loadedCocktail[0];
    cocktailIngredients = loadedCocktail[1];
    cocktailInstructions = loadedCocktail[2];

    displayCocktail();
}

function displayCocktail() {
    document.querySelector("#cocktail-name").textContent = cocktailName.toUpperCase();

    for (let i = 0; i < cocktailIngredients.length; i++) {
        let ingredientItem = document.createElement("li")
        ingredientItem.textContent = cocktailIngredients[i];
        document.querySelector("#ingredients-list").appendChild(ingredientItem)        
    };
    document.querySelector("#instructions").textContent = cocktailInstructions
    console.log(cocktailInstructions)
}


loadCocktailRecipe();