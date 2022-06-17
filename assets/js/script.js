//1.use magicWord() to determine if we are trying to find a drink that is served hot or cold

//2.use findWord() to find the word in the data array and save the index number

//3.use _______() to randomize the saved index numbers and choose one to display.







const temp = 89

//function to request list of drinks with the word hot in its preparded instructions
function hot() {

    
    var getCocktailData = function (ingredName) {
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
                        findWord()
                    })
                };
            })
    };
        
    getCocktailData()
    

};

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
        return "cold"
    }

    if(temp<=80 && temp>=60){
        return ""
    }

    if(temp<60){
        return "hot"
    }
    console.log(magicWord());
};
console.log(magicWord());
