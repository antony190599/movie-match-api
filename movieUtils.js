const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

function getMovieByTitle(movieTitle, callback) {
  const csvFilePath = path.join(__dirname, 'data', 'movies.csv');

  fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }

    parse(data, { columns: true, trim: true }, (err, movies) => {
      if (err) {
        return callback(err);
      }

      const movie = movies.find(movie => movie.title.toLowerCase() === movieTitle.toLowerCase());

      if (!movie) {
        return callback(new Error('Movie not found.'));
      }

      callback(null, movie);
    });
  });
}

function getRandomMovie(callback) {
  const csvFilePath = path.join(__dirname, 'data', 'movies.csv');

  fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }

    parse(data, { columns: true, trim: true }, (err, movies) => {
      if (err) {
        return callback(err);
      }

      const randomIndex = Math.floor(Math.random() * movies.length);
      const randomMovie = movies[randomIndex];

      callback(null, randomMovie);
    });
  });
}

module.exports = { getMovieByTitle, getRandomMovie };