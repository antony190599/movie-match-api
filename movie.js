import { getMovieByTitle } from './movieUtils.js';

// Get the movie title from command line arguments
const movieTitle = process.argv[2];

if (!movieTitle) {
  console.error('Please provide a movie title.');
  process.exit(1);
}

getMovieByTitle(movieTitle, (err, movie) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  // Print the movie details
  console.log({
    title: movie.title,
    year: movie.year,
    genre: movie.genre,
    director: movie.director,
    plot: movie.plot
  });
});