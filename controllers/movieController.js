import {
  getRandomMovie,
  getMovies,
  findMovieByIdOrName,
} from '../services/movieService.js';

export const getRandomMovieController = async (req, res) => {
  try {
    const movie = await getRandomMovie();
    res.json(movie);
  } catch (err) {
    res.status(500).send('Error retrieving movie');
  }
};

export const getAllMoviesController = async (req, res) => {
  try {
    const { genre, name, year } = req.query;
    let movies = await getMovies();

    if (genre) {
      movies = movies.filter(movie =>
        movie.genre.toLowerCase().includes(genre.toLowerCase())
      );
    }

    if (name) {
      movies = movies.filter(movie =>
        movie.title.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (year) {
      movies = movies.filter(movie => movie.year === year);
    }

    if (movies.length === 0) {
      return res.status(404).json({ error: "No se encontraron resultados para la búsqueda." });
    }

    res.json(movies);
  } catch (err) {
    res.status(500).send('Error retrieving movies');
  }
};

export const getMovieByIdOrNameController = async (req, res) => {
  try {
    const idOrName = req.params.idOrName;
    const movie = await findMovieByIdOrName(idOrName);

    if (!movie) {
      return res.status(404).json({ error: "No se encontraron resultados para la búsqueda." });
    }

    res.json(movie);
  } catch (err) {
    res.status(500).send('Error retrieving movie');
  }
};