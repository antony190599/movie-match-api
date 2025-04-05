import express from 'express';
import {
  getRandomMovieController,
  getAllMoviesController,
  getMovieByIdOrNameController,
  getMovieRecommendationsController,
  getPaginatedMoviesController,
} from '../controllers/movieController.js';
import { validate } from '../middlewares/requestValidationMiddleware.js';
import { 
  validateIdOrName, 
  validatePagination 
} from '../validators/movieValidators.js';

const router = express.Router();

// Route to get a random movie
router.get('/', getRandomMovieController);

// Route to get paginated movies with optional filters
router.get('/movies', validate(validatePagination), getPaginatedMoviesController);

// Route to get a movie by ID or name
router.get('/movies/:idOrName', validate(validateIdOrName), getMovieByIdOrNameController);

// Route to get recommendations based on genre
router.get('/movies/:idOrName/recommendations', validate(validateIdOrName), getMovieRecommendationsController);

export default router;
