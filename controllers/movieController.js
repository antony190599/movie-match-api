const { getRandomMovie, getAllMovies, getMovieByIdOrName } = require('../movieUtils');

// Controlador para obtener una película aleatoria
const getRandomMovieController = (req, res) => {
  getRandomMovie((err, movie) => {
    if (err) {
      return res.status(500).send('Error retrieving movie');
    }
    res.json(movie);
  });
};

// Controlador para obtener todas las películas (con filtro opcional por género)
const getAllMoviesController = (req, res) => {
  const genre = req.query.genre;

  getAllMovies((err, movies) => {
    if (err) {
      return res.status(500).send('Error retrieving movies');
    }

    let filteredMovies = movies;
    if (genre) {
      filteredMovies = movies.filter((movie) =>
        movie.genre.toLowerCase().includes(genre.toLowerCase())
      );
    }

    res.json(filteredMovies);
  });
};

// Controlador para obtener una película por ID o nombre
const getMovieByIdOrNameController = (req, res) => {
  const idOrName = req.params.idOrName;

  getMovieByIdOrName(idOrName, (err, movie) => {
    if (err) {
      return res.status(404).send('Movie not found');
    }
    res.json(movie);
  });
};

module.exports = {
  getRandomMovieController,
  getAllMoviesController,
  getMovieByIdOrNameController,
};