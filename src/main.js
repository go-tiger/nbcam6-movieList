(function () {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGE0OTlhNjhjZjdjM2JlMWY0YTE0MTM0NzRjOTBkYyIsInN1YiI6IjY0NzZhMGRjMWY5OGQxMDI4NDcxZTE0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5Xn_Gf7Zc5cf_y_fCg5_dnQf2gz2N1JfC2BQFEfbWDk',
    },
  };

  fetch(
    'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
    options
  )
    .then(response => response.json())
    .then(response => {
      let data = response['results'];
      let movieList = document.querySelector('.card-list');

      function displayMovies(movies) {
        movieList.innerHTML = '';

        movies.forEach(movie => {
          let id = movie.id;
          let overview = movie.overview;
          let poster_path = movie.poster_path;
          let title = movie.title;
          let vote_average = movie.vote_average;

          let movieCard = document.createElement('div');
          movieCard.setAttribute('class', 'movie-card');
          movieCard.setAttribute('id', id);

          let img = document.createElement('img');
          img.setAttribute(
            'src',
            `https://image.tmdb.org/t/p/w500/${poster_path}`
          );
          img.setAttribute('alt', title);
          movieCard.appendChild(img);
          img.addEventListener('click', () => {
            let msg = `영화 id: ${id}`;
            window.alert(msg);
          });

          let h3 = document.createElement('h3');
          h3.setAttribute('class', 'movie-title');
          h3.textContent = title;
          movieCard.appendChild(h3);

          let h4 = document.createElement('h4');
          h4.setAttribute('class', 'movie-rating');
          h4.textContent = vote_average;
          movieCard.appendChild(h4);

          let p = document.createElement('p');
          p.textContent = overview;
          movieCard.appendChild(p);

          movieList.appendChild(movieCard);
        });
      }

      function handleSearch(event) {
        event.preventDefault();
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput.value.trim().toLowerCase();

        let filteredMovies = data.filter(movie => {
          let title = movie.title.toLowerCase();
          return title.includes(searchTerm);
        });

        displayMovies(filteredMovies);
      }

      const searchForm = document.querySelector('.search');
      searchForm.addEventListener('submit', handleSearch);

      displayMovies(data);
    })
    .catch(err => console.error(err));
})();
