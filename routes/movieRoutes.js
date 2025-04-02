import express from 'express';
import {
  getRandomMovieController,
  getAllMoviesController,
  getMovieByIdOrNameController,
  getMovieRecommendationsController,
} from '../controllers/movieController.js';

const router = express.Router();

// Ruta para obtener una película aleatoria
router.get('/', getRandomMovieController);

// Ruta para obtener todas las películas (con filtro opcional por género)
router.get('/movies', getAllMoviesController);

// Ruta para obtener una película por ID o nombre
router.get('/movies/:idOrName', getMovieByIdOrNameController);

// Ruta para obtener recomendaciones basadas en género
router.get('/movies/:idOrName/recommendations', getMovieRecommendationsController);

export default router;
