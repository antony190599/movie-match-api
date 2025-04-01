import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

const csvFilePath = path.join(path.dirname(import.meta.url), '../data/movies.csv');

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
        return reject(err);
      }

      parse(data, { columns: true, trim: true }, (err, movies) => {
        if (err) {
          return reject(err);
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
