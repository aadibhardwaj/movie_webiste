const apiKey = 'baff41a90d465d14ac6d6afdf6d2d02a';

document.getElementById('search-input').addEventListener('input', searchMovies);

function searchMovies() {
    const query = document.getElementById('search-input').value;

    if (query.length < 3) {
        document.getElementById('movies-list').innerHTML = '';
        return;
    }
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=en-US&page=1&include_adult=false`;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayMovies(data.results);
        });
}

function displayMovies(movies) {
    const moviesList = document.getElementById('movies-list');
    moviesList.innerHTML = '';

    movies.forEach(function (movie) {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');

        const movieImage = movie.poster_path ?
            `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">` :
            `<img src="https://via.placeholder.com/200x300?text=No+Image" alt="No Image">`;

        movieItem.innerHTML = `
            ${movieImage}
            <h3>${movie.title}</h3>
            <p>${movie.release_date ? movie.release_date : 'No release date'}</p>
        `;
        movieItem.addEventListener('click', function () {
            window.location.href = `movie.html?id=${movie.id}`;
        });

        moviesList.appendChild(movieItem);
    });
}
