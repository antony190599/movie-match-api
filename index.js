import express from 'express';
import movieRoutes from './routes/movieRoutes.js';
import { getMovies } from './services/movieService.js';

const app = express();
const PORT = 3000;

// Montar las rutas
app.use('/', movieRoutes);

// Ruta para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Middleware para manejo centralizado de errores
app.use((err, req, res, next) => {
  console.error(`Unhandled error: ${err.message}`);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'An unexpected error occurred on the server.' });
});

// Iniciar el servidor
app.listen(PORT, async () => {
  try {
    const movies = await getMovies();
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Loaded ${movies.length} movies.`);
  } catch (err) {
    console.error(`Failed to load movies: ${err.message}`);
  }
});
