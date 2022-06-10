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

const modal = document.querySelector("#modal");
// variables
let pages = 1; // minimum is 1 for MovieDB API
let endOfPageReached = false;
/**
 * creates a request to the movieDB API depending on arguments passed. query triggers a "movie search." In case it is undefined, it will call
 * displayResult with the "now playing" movies. isNewQuery works as a sentinel to clear the results in the card grid and reset the number of pages
 * @param {query} String
 * @param {isNewQuery} Boolean
 */
const getResults = async (query, isNewQuery) => {
	let response;

	// check if the no result div is present, if it is, hide it for a new query
	hideElement(noResultsDiv);

	if (isNewQuery) {
		pages = 1;
		clearResults();
	}
	//check if an argument was passed or not. 
	//if false, it will request for the 'now playing.' otherwise, it will search for a query
	if (query === undefined) {
		//fetches 'now playing' movies
		response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${pages}`)
		//increase pages for next call
		pages++;
	} else {
		response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${pages}&include_adult=${INCLUDE_ADULT}&query=${query}`);
		showElement(buttonClose);
		pages++;
	}

	let responseData = await response.json();
	console.log(responseData); //debugging

	//if there are no results, show a text for the user to know
	if (responseData.results.length == 0) {
		console.log("no results received");

		showElement(noResultsDiv);
		hideElement(buttonMore);
		
		endOfPageReached = true;
	} else {
		//send results as it is the main data that will be manipulated
		displayResults(responseData.results);
	}
}

// clear all the results every time is called
const clearResults = () => {
	endOfPageReached = false;
	movieGrid.innerHTML = ``;
	showElement(buttonMore);
}

/** 
 * when displayResults is called, it receives 
 * all the data and convert the movies into 'cards' 
 * with all the relevant information of it 
 */

const displayResults = (dataObject) => {
	// for each result object displayResults receives, a card is created
	dataObject.forEach(element => {
		if (element.poster_path === null) return; // TODO CHANGE THIS WITH A PLACEHOLDER

		let movieCard = document.createElement("div");
		movieCard.classList.add("movie-card");

		let moviePoster = document.createElement("img");
		moviePoster.classList.add("movie-poster");
		moviePoster.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
		moviePoster.alt = "Movie poster";
		moviePoster.addEventListener('click', (e) => {
			openDetails(element); // Throw the object in order to show full details of the movie in a popup 
		});

		let movieCardSpecWrapper = document.createElement("div");
		movieCardSpecWrapper.classList.add("movie-card-specs");

		let movieTitle = document.createElement("span");
		movieTitle.textContent = element.original_title;

		let movieVotes = document.createElement("span");
		movieVotes.innerHTML = `${element.vote_average} <i style="color:yellow;" class="fa fa-star"></i>`;

		movieCardSpecWrapper.appendChild(movieTitle);
		movieCardSpecWrapper.appendChild(movieVotes);

		movieCard.appendChild(moviePoster);
		movieCard.appendChild(movieCardSpecWrapper);
		//add the card element containing all child elements
		movieGrid.appendChild(movieCard);
	});

	//show button to make more requests
	showElement(buttonMore);

	// add eventListeners to all images so we can open a modal
}

const openDetails = (element) => {

}

const showElement = (element) => {
	if(element.classList.contains("hidden")) {
		element.classList.remove("hidden");
	}
}

const hideElement = (element) => {
	if(!element.classList.contains("hidden")) {
		element.classList.add("hidden");
	}
}

//show more button event
const showMoreEvent = () => {
	if (!endOfPageReached) {
		if (form.query.value == '') {
			getResults();
		} else {
			getResults(form.query.value, false);
		}
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
		showMoreEvent();
	});

	//Close search button listener
	buttonClose.addEventListener('click', (e) => {
		getResults(undefined, true);
		hideElement(buttonClose);
	});

	//search input listener 
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		getResults(e.target.query.value, true);
	});
}

window.onscroll = function () {
	// show "go to top" button every time the user scrolls more than 300 pixels  
	if ((document.body.scrollTop > 300) || (document.documentElement.scrollTop > 300)) { //TODO change to a value relative to the user's screen
		buttonTop.style.display = "block";
	} else {
		buttonTop.style.display = "none";
	}

	if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight)) {
		showMoreEvent();
	}
}

window.onload = () => {
	addEventListeners();
	getResults();
}