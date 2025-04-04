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
    console.error(`Error in getRandomMovieController: ${err.message}`);
    res.status(500).json({ error: 'Failed to retrieve a random movie.' });
  }
};

export const getAllMoviesController = async (req, res, next) => {
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
      const error = new Error("No se encontraron resultados para la búsqueda.");
      error.status = 404;
      throw error;
    }

    res.json(movies);
  } catch (err) {
    next(err); // Delegar al middleware de errores
  }
};

export const getMovieByIdOrNameController = async (req, res, next) => {
  try {
    const idOrName = req.params.idOrName;
    const movie = await findMovieByIdOrName(idOrName);

    if (!movie) {
      const error = new Error("No se encontraron resultados para la búsqueda.");
      error.status = 404;
      throw error;
    }

    res.json(movie);
  } catch (err) {
    next(err); // Delegar al middleware de errores
  }
};

export const getMovieRecommendationsController = async (req, res, next) => {
  try {
    const idOrName = req.params.idOrName;
    const movie = await findMovieByIdOrName(idOrName);

    if (!movie) {
      const error = new Error("No se encontraron resultados para la búsqueda.");
      error.status = 404;
      throw error;
    }

    const allMovies = await getMovies();
    const recommendations = allMovies.filter(
      m => m.genre.toLowerCase().includes(movie.genre.toLowerCase()) && m.id !== movie.id
    );

    res.json({
      movie,
      recommendations: recommendations.slice(0, 5), // Limit to 5 recommendations
    });
  } catch (err) {
    next(err); // Delegar al middleware de errores
  }
};

export const getPaginatedMoviesController = async (req, res, next) => {
  try {
    const { cursor, limit = 10 } = req.query;

    // Validate limit
    const parsedLimit = parseInt(limit, 10);
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      return res.status(400).json({ error: 'Invalid limit parameter. Must be a positive integer.' });
    }

    // Decode cursor
    let startIndex = 0;
    if (cursor) {
      const [cursorId, cursorTitle] = cursor.split(':');
      if (!cursorId || !cursorTitle) {
        return res.status(400).json({ error: 'Invalid cursor format. Expected "id:movie_name".' });
      }

      const movies = await getMovies();
      startIndex = movies.findIndex(
        movie => movie.id === cursorId && movie.title === cursorTitle
      );

      if (startIndex === -1) {
        return res.status(400).json({ error: 'Invalid cursor. Movie not found.' });
      }

      startIndex += 1; // Start after the cursor
    }

    // Load movies and apply pagination
    const movies = await getMovies();
    const paginatedMovies = movies.slice(startIndex, startIndex + parsedLimit);

    // Determine nextCursor and hasMore
    const hasMore = startIndex + parsedLimit < movies.length;
    const nextCursor = hasMore
      ? `${paginatedMovies[paginatedMovies.length - 1].id}:${paginatedMovies[paginatedMovies.length - 1].title}`
      : null;

    // Respond with paginated data
    res.json({
      shows: paginatedMovies,
      nextCursor,
      hasMore,
    });
  } catch (err) {
    next(err); // Delegate to error middleware
  }
};