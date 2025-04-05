import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvFilePath = path.join(__dirname, '../data/movies.csv');

class Movie {
  constructor({ id, title, year, genre, director, actors, plot, imdb_rating, runtime_minutes }) {
    this.id = id;
    this.title = title;
    this.year = parseInt(year, 10);
    this.genre = genre;
    this.director = director;
    this.actors = actors;
    this.plot = plot;
    this.imdbRating = parseFloat(imdb_rating);
    this.runtimeMinutes = parseInt(runtime_minutes, 10);
  }
}

export async function getMovies() {
  return new Promise((resolve, reject) => {
    fs.readFile(csvFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading CSV file: ${err.message}`);
        return reject(new Error('Failed to load movies data.'));
      }

      parse(data, { columns: true, trim: true }, (err, movies) => {
        if (err) {
          console.error(`Error parsing CSV data: ${err.message}`);
          return reject(new Error('Failed to parse movies data.'));
        }
        resolve(movies.map(movie => new Movie(movie)));
      });
    });
  });
}

export async function findMovieByIdOrName(idOrName) {
  const movies = await getMovies();
  return movies.find(
    movie =>
      movie.id.toLowerCase() === idOrName.toLowerCase() ||
      movie.title.toLowerCase() === idOrName.toLowerCase()
  ) || null;
}

export async function getRandomMovie() {
  const movies = await getMovies();
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
}

export async function getPaginatedMovies(cursor, limit = 10, filters = {}) {
  
  // Get all movies
  let movies = await getMovies();
  
  // Apply filters if provided
  if (filters.genre) {
    movies = movies.filter(movie => 
      movie.genre.toLowerCase().includes(filters.genre.toLowerCase())
    );
  }
  
  if (filters.name) {
    movies = movies.filter(movie => 
      movie.title.toLowerCase().includes(filters.name.toLowerCase())
    );
  }
  
  if (filters.year) {
    movies = movies.filter(movie => 
      movie.year === parseInt(filters.year, 10)
    );
  }
  
  // Find the starting position based on cursor
  let startIndex = 0;
  console.log('limit:', limit);
  if (cursor) {
    try {
      
      // Find the index of the movie after the cursor
      const cursorIndex = movies.findIndex(movie => 
        movie.id === cursor
      );

      console.log('cursorIndex:', cursorIndex);
      
      // If the cursor is valid, start from the next item
      if (cursorIndex !== -1) {
        startIndex = cursorIndex + 1;
      }
    } catch (error) {
      console.error('Error parsing cursor:', error);
      // If cursor is invalid, start from the beginning
    }
  }
  
  // Get paginated results
  const endIndex = startIndex + limit - 1;
  const paginatedMovies = movies.slice(startIndex, endIndex);
  console.log(startIndex, endIndex, paginatedMovies.length);
  
  // Determine if there are more results
  const hasMore = endIndex < movies.length;
  
  // Create next cursor if there are more results
  let nextCursor = null;
  if (hasMore && movies[endIndex]) {
    nextCursor = `${movies[endIndex].id}`;
  }
  
  return {
    movies: paginatedMovies,
    nextCursor,
    hasMore
  };
}