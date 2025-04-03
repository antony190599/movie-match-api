# Movie Match API

A RESTful API for managing and retrieving movie data.

## Features
- Retrieve random movies
- Filter movies by genre, name, or year
- Get movie recommendations
- API documentation with Swagger

## Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file based on `.env.example`.

## Usage
- Start the server: `npm start`
- Access API docs: `http://localhost:3000/docs`

## Folder Structure
```
movie-match-api/
├── controllers/
│   ├── moviesController.js
├── data/
│   └── movies.csv
├── routes/
│   └── moviesRoutes.js
├── middlewares/
│   ├── logger.js
│   ├── errorHandler.js
│   └── cors.js
├── services/
│   └── movieService.js
├── docs/
│   └── swagger.yaml
├── .env
├── .env.example
├── .gitignore
├── index.js
├── package.json
└── README.md
```
