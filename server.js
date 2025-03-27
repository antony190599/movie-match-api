const express = require('express');
const {
  getRandomMovieController,
  getAllMoviesController,
  getMovieByIdOrNameController,
} = require('./controllers/movieController');

const app = express();
const PORT = 3000;

// Ruta para obtener una película aleatoria
app.get('/', getRandomMovieController);

// Ruta para obtener todas las películas (con filtro opcional por género)
app.get('/movies', getAllMoviesController);

// Ruta para obtener una película por ID o nombre
app.get('/movies/:idOrName', getMovieByIdOrNameController);

// Ruta para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});