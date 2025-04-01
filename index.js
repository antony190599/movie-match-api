import express from 'express';
import movieRoutes from './routes/movieRoutes.js';

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
  console.error(err.stack);
  res.status(500).json({ error: "Ocurrió un error en el servidor." });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
