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

export function getMovies() {
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