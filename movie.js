const fs = require('fs');
const path = require('path');

// Get the movie title from command line arguments
const movieTitle = process.argv[2];

if (!movieTitle) {
  console.error('Please provide a movie title.');
  process.exit(1);
}

// Path to the CSV file
const csvFilePath = path.join(__dirname, 'data', 'movies.csv');

// Read the CSV file
fs.readFile(csvFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the CSV file:', err);
    process.exit(1);
  }

  // Split the CSV data into rows
  const rows = data.split('\n');

  // Get the headers
  const headers = rows[0].split(',');

  // Find the movie by title
  const movie = rows.slice(1).map(row => {
    const values = row.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header.trim()] = values[index].trim();
      return obj;
    }, {});
  }).find(movie => movie.title.toLowerCase() === movieTitle.toLowerCase());

  if (!movie) {
    console.error('Movie not found.');
    process.exit(1);
  }

  // Print the movie details
  console.log({
    title: movie.title,
    year: movie.year,
    genre: movie.genre,
    director: movie.director,
    plot: movie.plot
  });
});