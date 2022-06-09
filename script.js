//https://api.themoviedb.org/3/movie/550?api_key=3888a9aa421b0d908bcf29d7e7af2804 EXAMPLE

//GLOBAL CONSTANTS
const INCLUDE_ADULT = false;

//ELEMENTS
const movieGrid = document.querySelector("#movies-grid");
const form = document.querySelector("form");
const noResultsDiv = document.querySelector("#no-result-wrapper");

const buttonMore = document.querySelector("#load-more-movies-btn");
const buttonTop = document.querySelector("#button-top");
const buttonClose = document.querySelector("#close-search-btn");

// variables
let pages = 1; // minimum is 1 for MovieDB API
let lastQuery = NaN;
/**
 * creates a request to the movieDB API depending on arguments passed. query triggers a "movie search." In case it is undefined, it will call
 * displayResult with the "now playing" movies. isNewQuery works as a sentinel to clear the results in the card grid and reset the number of pages
 * @param {query} String
 * @param {isNewQuery} Boolean
 */
const getResults = async (query, isNewQuery) => {
	let response;

	if (isNewQuery) {
		pages = 1;
		clearResults();
	}

	if (query === undefined) {
		//fetches 'now playing' movies
		response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${pages}`)
		//increase pages for next call
		pages++;
	} else {
		response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${pages}&include_adult=${INCLUDE_ADULT}&query=${query}`);
		showCloseButton();
		pages++;
	}

	console.log(response); //debugging
	
	let responseData = await response.json();
	
	console.log(responseData); //debugging
	//if there are no results, show a text for the user to know
	if(responseData.results.length == 0) {
		console.log("no results received");
		showNoResults();
		hideMoreButton();
	} else {


	//send results as it is the main data that will be manipulated
	displayResults(responseData.results);
	}
}

// clear all the results every time is called
const clearResults = () => {
	movieGrid.innerHTML = ``;
}

/** 
 * when displayResults is called, it receives 
 * all the data and convert the movies into 'cards' 
 * with all the relevant information of it 
 */

const displayResults = (dataObject) => {
	// for each result object displayResults receives, a card is created
	dataObject.forEach(element => {
		if (element.poster_path === null) return;
		movieGrid.innerHTML += `
        <div class="movie-card">    
            <img alt="Movie poster" class="movie-poster" src='https://image.tmdb.org/t/p/w500${element.poster_path}'>
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

	//show button to make more requests
	showMoreButton();

	// add eventListeners to all images so we can open a modal
	// TODO
}

// show/hide functions for close search button
const showCloseButton = () => {
	if(buttonClose.classList.contains("hidden")) {
		buttonClose.classList.remove("hidden");
	}
}

const hideCloseButton = () => {
	if(!buttonClose.classList.contains("hidden")) {
		buttonClose.classList.add("hidden");
	}
	// reset input value
	// console.log(form.query.value);
	form.query.value = '';
	console.log(form.query.value);
}

// shows/hides the "Show More!" button
const showMoreButton = () => {
	if(buttonMore.classList.contains("hidden")) {
		buttonMore.classList.remove("hidden");
	}
}

const hideMoreButton = () => {
	if(!buttonMore.classList.contains("hidden")){
		buttonMore.classList.add("hidden");
	}
}

// shows/hides a text alerting the user that there are no more results
const showNoResults = () => {
	if(noResultsDiv.classList.contains("hidden")) {
		noResultsDiv.classList.remove("hidden");
	}
}

const hideNoResults = () => {
	if(!noResultsDiv.classList.contains("hidden")){
		noResultsDiv.classList.add("hidden");
	}
}

// callback for "go to top" button
const goTop = () => {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

// wrap all the eventListeners here
const addEventListeners = () => {
	//Show More button listener
	buttonMore.addEventListener('click', (e) => { //atm using an anonymous function
		if (form.query.value == '') {
			getResults();
		} else {
			getResults(form.query.value, false);
		}
	});

	//Close search button listener
	buttonClose.addEventListener('click', (e) => {
		getResults(undefined, true);
		hideCloseButton();
	});

	//search input listener 
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		getResults(e.target.query.value, true);
	});
}

// show "go to top" button every time the user scrolls more than 300 pixels  
window.onscroll = function () {
	if ((document.body.scrollTop > 300) || (document.documentElement.scrollTop > 300)) { //TODO change to a value relative to the user's screen
		buttonTop.style.display = "block";
		// buttonTop.style.filter = "opacity(100%)"
	} else {
		buttonTop.style.display = "none";
		// buttonTop.style.display = "opacity(0%)";
	}
}

window.onload = () => {
	addEventListeners();
	getResults();
}