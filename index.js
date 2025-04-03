import express from 'express';
import movieRoutes from './routes/movieRoutes.js';
import { getMovies } from './services/movieService.js';
import { loggingMiddleware } from './middlewares/loggingMiddleware.js';
import { corsMiddleware } from './middlewares/corsMiddleware.js';
import { errorMiddleware } from './middlewares/errorHandler.js';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

// Load the Swagger YAML file from the /docs folder
const swaggerDocument = YAML.load('./docs/swagger.yaml');

const app = express();
const PORT = 3000;

// Middlewares
app.use(loggingMiddleware);
app.use(corsMiddleware);

// Swagger documentation route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Montar las rutas
app.use('/', movieRoutes);

// Ruta para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Middleware para manejo centralizado de errores
app.use(errorMiddleware);

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
