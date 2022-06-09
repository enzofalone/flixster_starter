//https://api.themoviedb.org/3/movie/550?api_key=3888a9aa421b0d908bcf29d7e7af2804 EXAMPLE

//GLOBAL CONSTANTS

//ELEMENTS
const movieGrid = document.querySelector("#movies-grid");

// variables
let pages = 0;
let lastQuery = '';

async function getResults(query) {
    let response;
    if(query === undefined){
        //fetches now playing movies
        response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
    } else {
        //if there was an argument passed, we query the argument
        //              TODO 
    }
    console.log(response);
    let responseData = await response.json();
    
    console.log(responseData);
    
    //send results as it is the main data that will be manipulated
    displayResults(responseData.results);  
}

function displayResults(dataObject) {
    dataObject.forEach(element => {
        movieGrid.innerHTML += `<img src='https://image.tmdb.org/t/p/w500${element.poster_path}'>`;
    });
}

window.onload = () => {
    getResults();
}