//https://api.themoviedb.org/3/movie/550?api_key=3888a9aa421b0d908bcf29d7e7af2804 EXAMPLE

//GLOBAL CONSTANTS

//ELEMENTS
const movieGrid = document.querySelector("#movies-grid");
const buttonMore = document.querySelector("#button-more");
// variables
let pages = 1;
let lastQuery = '';

async function getResults(query) {
    let response;
    if (query === undefined) {
        //fetches now playing movies
        response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${pages}`)
        pages++;
    } else {
        //if there was an argument passed, we query the argument
        //              TODO 
        pages = 1;
    }
    console.log(response);
    let responseData = await response.json();

    console.log(responseData);

    //send results as it is the main data that will be manipulated
    displayResults(responseData.results);
}

/** 
 * displayResults is in charge of receiving 
 * all the data and convert the movies into 'cards' 
 * with all the relevant information of it 
 */

function displayResults(dataObject, isNewQuery) {
    //clear grid every time we are going to display more results
    if(isNewQuery){
        movieGrid.innerHTML = ``;
    }
    // for each result object displayResults receives, a card is created
    dataObject.forEach(element => {
        movieGrid.innerHTML += `
        <div class="movie-card">    
            <img class="movie-poster" src='https://image.tmdb.org/t/p/w500${element.poster_path}'>
            <div class="movie-card-specs">
                <span class="movie-title">${element.original_title}</span>
                <div class="movie-votes">
                    ${element.vote_average} 
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                    </svg>
                </div>
            </div>
        </div>
        `;
    });
}

window.onload = () => {
    buttonMore.addEventListener('click',(e) => {
        getResults();
    });
    
    getResults();
}