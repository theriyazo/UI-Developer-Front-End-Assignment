"use strict";

const API_KEY = "PASTE_API_KEY_HERE";
const titleQuery = "&t=";
const BASE_URL = "http://www.omdbapi.com/?apikey=" + API_KEY + titleQuery;
let movieTitle = "";
const movieEl = document.createElement("div");
const movieContainer = document.getElementById("movie-Container");
const searchBtn = document.querySelector(".search");

const getMovie = function (url) {
  // fetching API Response
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovie(data);
    });
};

const showMovie = function (data) {
  if (data.Response === "True") {
    movieContainer.innerHTML = ` `;

    movieEl.classList.add("movieInfo");
    movieEl.classList.add("flexRow");

    // dynamically writing movie Html
    movieEl.innerHTML = ` 
        <img src="${data.Poster}" alt="${data.Title} Poster Not Found!" class="moviePoster" />

        <div class="movieOverview flexColumn">
            <div class="title">
                <h2>${data.Title}</h2>
                <p class="subtitle">
                <span id="year">${data.Year}</span>
                <span class="seperator">•</span>
                <span id="genre">${
                    (data.Genre).includes(', ') ? (data.Genre).replaceAll(', ', '/') : data.Genre
                }</span>
                <span class="seperator">•</span>
                <span id="runtime">${data.Runtime}</span>
                </p>
            </div>

            <div class="fullInfo flexColumn">
                <p id="releaseDate">
                <span class="overviewTitle">Release Date: </span>${data.Released}
                </p>
                <p id="directors">
                <span class="overviewTitle">Directors: </span>${data.Director}
                </p>
                <p id="boxOffice">
                <span class="overviewTitle">Box Office: </span>${data.BoxOffice}
                </p>
                <p id="actors">
                <span class="overviewTitle">Actors: </span>${data.Actors}
                </p>
                <p id="awards">
                <span class="overviewTitle">Awards: </span>${data.Awards}
                </p>
            </div>
        </div>
    `;
    append();
  } else {
    //   Data Validation:1
    // dynamically writing ERROR message if movie is not found
    movieEl.innerHTML = `
        <div class="movieInfo flexRow">
            <h3>☹️ Sorry, ${data.Error}</h3>
        </div>
    `;
    append();
  }
};

function append() {
    movieContainer.appendChild(movieEl);
}

// Removing last white spaces and converting to lower case
const fixString = function (str) {
  const fixedStr = str.trim().toLowerCase();
  return fixedStr;
};

const searchMovie = function () {
  movieTitle = fixString(document.querySelector(".movieTitle").value);
  if (!movieTitle) {
    // dynamically writing ERROR message if movie is not found
    movieEl.innerHTML = `
        <div class="movieInfo flexRow">
            <h3>😕 Atlesst Type Somthing in the Box!</h3>
        </div>
    `;
    append();
  }
  else{
    getMovie(BASE_URL + movieTitle);
  }
};

// If search Button Is Clicked
searchBtn.addEventListener("click", searchMovie);

// If [Enter] key is pressed Is Clicked
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchMovie();
  }
});
