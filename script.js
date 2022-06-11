//GLOBAL CONSTANTS
const API_KEY = "47e63e8fc6fc190f2fc001150e8a2b60";
const INCLUDE_ADULT = false;

//ELEMENTS
const movieGrid = document.querySelector("#movies-grid");
const form = document.querySelector("form");
const noResultsDiv = document.querySelector("#no-result-wrapper");

const buttonMore = document.querySelector("#load-more-movies-btn");
const buttonTop = document.querySelector("#button-top");
const buttonClose = document.querySelector("#close-search-btn");
//MODAL ELEMENTS
const modal = document.querySelector("#modal");
const modalBg = document.querySelector("#modal-background");
const modalHeader = modal.querySelector("#modal-header")
const modalBody = modal.querySelector("#modal-body");
const modalFrame = modal.querySelector("iframe");
const modalRating = modal.querySelector("#modal-rating");
const modalReleaseDate = modal.querySelector("#modal-release-date");
// variables
let pages = 1; // minimum is 1 for MovieDB API

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

	//if there are no results, show a text for the user to know
	if (responseData.results.length == 0) {
		console.log("no results received");

		showElement(noResultsDiv);
		hideElement(buttonMore);
	} else {
		//send results as it is the main data that will be manipulated
		displayResults(responseData.results);
	}
}

const getVideo = async(movieId) => {
	let response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`)
	let responseData = await response.json();

	return responseData;
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
		let posterPath;

		//if the current movie does not have a poster_path, it is replaced with a placeholder
		if (element.poster_path === null) {
			posterPath = "https://i0.wp.com/www.theatrecr.org/wp-content/uploads/2016/01/poster-placeholder.png?ssl=1";
		} else {
			posterPath = `https://image.tmdb.org/t/p/w500${element.poster_path}`
		}

		let movieCard = document.createElement("div");
		movieCard.classList.add("movie-card");

		let moviePoster = document.createElement("img");
		moviePoster.classList.add("movie-poster");
		moviePoster.src = posterPath;
		moviePoster.alt = "Movie poster";
		moviePoster.addEventListener('click', (e) => {
			openDetails(element); // Pass the object in order to show full details of the movie in the popup 
		});

		let movieCardSpecWrapper = document.createElement("div");
		movieCardSpecWrapper.classList.add("movie-card-specs");

		let movieTitle = document.createElement("span");
		movieTitle.textContent = element.original_title;
		movieTitle.classList.add("movie-title");

		let movieVotes = document.createElement("span");
		movieVotes.innerHTML = `${element.vote_average} <i style="color:yellow;" class="fa fa-star"></i>`;
		movieVotes.classList.add("movie-votes");

		movieCardSpecWrapper.appendChild(movieTitle);
		movieCardSpecWrapper.appendChild(movieVotes);

		movieCard.appendChild(moviePoster);
		movieCard.appendChild(movieCardSpecWrapper);
		//add the card element containing all child elements
		movieGrid.appendChild(movieCard);
	});

	//show button to make more requests
	showElement(buttonMore);
}

//modal
const openDetails = async (element) => {
	showElement(modal);
	showElement(modalBg);

	let movieVideosObject;
	let youtubeKey;

	let backdrop_path;
	//Set all the elements according to the object's data
	
	// Background
	if(element.backdrop_path !== null){
		backdrop_path = `https://image.tmdb.org/t/p/original${element.backdrop_path}`
		// linear gradient used to reduce the brightness of the image and act as a 'filter'
		modal.style.background = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('${backdrop_path}')`;
	}

	// release date
	let releaseDate = element.release_date.replace("-"," ");
	modalReleaseDate.innerHTML = `<i class="fa fa-clock-o"></i> ${releaseDate}`
	//wait for promise in async block
	movieVideosObject = await getVideo(element.id);
	youtubeKey = movieVideosObject.results[0].key;

	console.log("element: ", element);
	console.log(111, youtubeKey);

	modalFrame.src = `https://www.youtube.com/embed/${youtubeKey}`;
	//title
	modalHeader.textContent = element.original_title;
	//body description
	modalBody.textContent = element.overview;

	//get the movie rating rounded to the bottom
	let movieRating = element.vote_average;

	//reset modalRating content for every time we open the modal
	modalRating.innerHTML = ``;

	for (let i = 0; i < 10; i++) {
		if (movieRating > 1) {
			modalRating.innerHTML += `<i style="color:yellow" class="fa fa-star"</i>`
			movieRating--;
		} else if(movieRating > 0){
			modalRating.innerHTML += `<i style="color:yellow" class="fa fa-star-half-empty"></i>`
			movieRating = 0;
		} else {
			modalRating.innerHTML += `<i style="color:whitesmoke" class="fa fa-star"</i>`
		}
	}

	modalBg.addEventListener("click", (e) => {
		closeDetails();
	})
}

const closeDetails = (e) => {
	hideElement(modal);
	hideElement(modalBg);
}

const showElement = (element) => {
	if (element.classList.contains("hidden")) {
		element.classList.remove("hidden");
	}
}

const hideElement = (element) => {
	if (!element.classList.contains("hidden")) {
		element.classList.add("hidden");
	}
}

//show more button event
const showMoreEvent = () => {
	if (form.query.value == '') {
		getResults();
	} else {
		getResults(form.query.value, false);
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
	// infinite scrolling feature 
	// if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight)) {
	// 	showMoreEvent();
	// }
}

window.onload = () => {
	addEventListeners();
	getResults();

}